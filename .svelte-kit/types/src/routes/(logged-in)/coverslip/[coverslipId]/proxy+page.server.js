// @ts-nocheck
import { coverslipSchema, coverslipsSchema, deleteEntrySchema, newCoverslipSchema } from '$lib/schemas/forms';
import { fail, redirect } from '@sveltejs/kit';
import { nanoid } from 'nanoid';
import { prisma } from '$lib/prisma';
import { redirectSameRoute } from '$lib/server/redirect';

/**
 * @typedef {import('@prisma/client').Slide & {
 *    slideIndex: number;
 * }} AugmentedSlide
 * @typedef {import('@prisma/client').User} User
 */

/** */
export const actions = {
	async new(event) {
		const user = event.locals.user;
		if (!user) {
			return fail(401, { formErrors: ['Please sign in']});
		}

		const formData = Object.fromEntries(await event.request.formData());
		const coverslipParse = newCoverslipSchema.safeParse(formData);
		if (!coverslipParse.success) {
			return fail(400, coverslipParse.error.formErrors);
		}
		const coverslip = await prisma.coverslip.create({
			data: {
				...coverslipParse.data,
				id: nanoid(),
				createdByUserId: user.id,
			},
		});
		return redirectSameRoute(event, `/slide/${coverslip.slideId}`);
	},
	async edit(event) {
		const user = event.locals.user;
		if (!user) {
			return fail(401, { formErrors: ['Please sign in']});
		}

		const formData = Object.fromEntries(await event.request.formData());
		const coverslipParse = coverslipSchema.safeParse(formData);
		if (!coverslipParse.success) {
			// console.log('coverslip parse unsuccessful');
			return fail(400, coverslipParse.error.formErrors);
		}
		await prisma.coverslip.update({
			where: {
				id: coverslipParse.data.id,
			},
			data: coverslipParse.data,
		})
			.then(() => {

				// console.log('coverslip updated');
			})
			.catch((error) => {
				console.error('coverslip update not successful', error);
				return fail(400, error); // check later
			});
	},

	async edits(event) {
		// Construct the form data
		const formData = Object.fromEntries(await event.request.formData());
		const ids = formData.ids.split(','); // convert to array
		// console.log(ids);

		const coverslipParse = coverslipsSchema.safeParse(formData);

		if (!coverslipParse.success) {
			// console.log('coverslip parse unsuccessful');
			return fail(400, coverslipParse.error.formErrors);
		}
		const coverslipData = {
			coating: coverslipParse.data.coating,
			positionX: coverslipParse.data.positionX,
			positionY: coverslipParse.data.positionY,
			shape: coverslipParse.data.shape,
			slideId: coverslipParse.data.slideId,
			specimen: coverslipParse.data.specimen,
		};

		for (const id of ids) {
			await prisma.coverslip.update({
				where: {
					id,
				},
				data: coverslipData,
			})
				.then(() => {
					console.log('coverslip updated');
				})
				.catch((error) => {
					console.error('coverslip update not successful', error);
					return fail(400, error); // check later
				});
		}
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
		const deletedCoverslip = await prisma.coverslip.delete({
			where: {
				id: deleteParse.data.id,
			},
		});
		return redirectSameRoute(event, `/slide/${deletedCoverslip.slideId}`);
	},
};
