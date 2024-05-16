// @ts-nocheck
import { error, fail } from '@sveltejs/kit';
import { deleteEntrySchema } from '$lib/schemas/forms';
import { FILE_UPLOAD_DIR } from '$lib/env';
import { nanoid } from 'nanoid';
import path from 'node:path';
import { prisma } from '$lib/prisma';
import { redirectDifferentRoute } from '$lib/server/redirect';
import { write } from '$lib/filesystem';

/** @param {Parameters<import('./$types').PageServerLoad>[0]} event */
export function load({ locals, params }) {
	return {
		files: prisma.coverslipFile.findMany({
			where: {
				coverslipId: params.coverslipId,
				createdByUserId: locals.user.id,
			},
			include: {
				createdBy: true,
			},
		}),
	};
}

/** */
export const actions = {
	async new(event) {
		const { locals, request } = event;
		const formData = await request.formData();

		const coverslipId = formData.get('coverslipId');
		if (typeof coverslipId !== 'string') {
			throw error(400);
		}

		// Get file entries
		const files = formData.getAll('files');
		for (const file of files) {
			if (typeof file === 'string') {
				throw error(400);
			}
			const id = nanoid();
			const filepath = path.join(FILE_UPLOAD_DIR, id);
			const buffer = Buffer.from(await file.arrayBuffer());
			write(filepath, buffer);
			await prisma.coverslipFile.create({
				data: {
					id,
					coverslipId,
					createdByUserId: locals.user.id,
					name: file.name,
					size: file.size,
				},
			})
				.then(() => {
					redirectDifferentRoute(event, `/coverslip/${coverslipId}/files`);
				})
				.catch((error) => {
					console.error(error);
				});
		}

	},
	async delete(event) {
		const formData = Object.fromEntries(await event.request.formData());
		const deleteParse = deleteEntrySchema.safeParse(formData);
		if (!deleteParse.success) {
			return fail(400, deleteParse.error.formErrors);
		}
		await prisma.coverslipFile.delete({
			where: {
				id: deleteParse.data.id,
			},
		});
	},
};
