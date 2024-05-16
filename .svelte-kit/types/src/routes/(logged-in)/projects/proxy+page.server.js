// @ts-nocheck
import { deleteEntrySchema, newProjectSchema, projectSchema } from '$lib/schemas/forms';
import { fail, redirect } from '@sveltejs/kit';
import { nanoid } from 'nanoid';
import { prisma } from '$lib/prisma';
import { q } from '$lib/query';

/** */
export const actions = {
	async new(event) {
		const user = event.locals.user;
		if (!user) {
			return fail(401, { formErrors: ['Please sign in']});
		}

		const formData = Object.fromEntries(await event.request.formData());
		const projectParse = newProjectSchema.safeParse(formData);
		if (!projectParse.success) {
			return fail(400, projectParse.error.formErrors);
		}

		const project = await prisma.project.create({
			data: {
				...projectParse.data,
				id: nanoid(),
				createdByUserId: user.id,
			},
		});
		throw redirect(303, `/project/${project.id}`);
	},
	async edit(event) {
		const user = event.locals.user;
		if (!user) {
			return fail(401, { formErrors: ['Please sign in']});
		}

		const formData = Object.fromEntries(await event.request.formData());
		const projectParse = projectSchema.safeParse(formData);
		if (!projectParse.success) {
			return fail(400, projectParse.error.formErrors);
		}

		await prisma.project.update({
			where: {
				id: projectParse.data.id,
			},
			data: projectParse.data,
		});
	},
	async delete(event) {
		const user = event.locals.user;
		if (!user) {
			return fail(401, { formErrors: ['Please sign in']});
		}

		const formData = Object.fromEntries(await event.request.formData());
		const deleteParse = deleteEntrySchema.safeParse(formData);
		if (!deleteParse.success) {
			return fail(400, deleteParse.error.formErrors);
		}

		await prisma.project.delete({
			where: {
				id: deleteParse.data.id,
			},
		});
		throw redirect(303, '/projects');
	},
};

/** @param {Parameters<import('./$types').PageServerLoad>[0]} event */
export async function load(event) {
	const { locals } = event;
	const projects = await prisma.project.findMany({
		where: {
			createdByUserId: locals.user.id,
		},
		include: {
			createdBy: true,
		},
	});

	return {
		projects,
		breadcrumbs: await q.breadcrumbs.findAll({}),
	};
}
