// @ts-nocheck
import { deleteEntrySchema, newSlideSchema, slideSchema } from '$lib/schemas/forms';
import { fail, redirect } from '@sveltejs/kit';
import { nanoid } from 'nanoid';
import { prisma } from '$lib/prisma';


let coverslips;
// Creating coverslips in the database
async function createCoverslips(slide, userid) {
	if (slide.type == 'plate') {
		coverslips = Array(8 * 12).fill(null)
			.map((_, index) => ({
				coating: '-',
				shape: 'round',
				slideId: slide.id,
				specimen: '-',
				id: nanoid(),
				createdByUserId: userid,
				plateIdx: index,
			}));
	}

	for (const coverslipData of coverslips) {
		try {
			const coverslip = await prisma.coverslip.create({
				data: coverslipData,
			});
			console.log(`Created coverslip with ID: ${coverslip.id}`);
		} catch (error) {
			console.error('Error creating coverslips:', error);
		}
	}
}

/** */


export const actions = {
	async new(event) {
		const user = event.locals.user;
		if (!user) {
			return fail(401, { formErrors: ['Please sign in']});
		}

		const formData = Object.fromEntries(await event.request.formData());
		const slideParse = newSlideSchema.safeParse(formData);
		if (!slideParse.success) {
			return fail(400, slideParse.error.formErrors);
		}


		await prisma.slide.create({
			data: {
				...slideParse.data,
				id: nanoid(),
				createdByUserId: user.id,
			},
		})
			.then((slide) => {
				if (slide.type === 'plate') {
					createCoverslips(slide, user.id)
						.catch((err) => console.error('Error while creating coverslips:', err));
					throw redirect(303, `/slide/${slide.id}`);
					/* .catch((e) => {
							console.error('Error creating coverslips:', e);
						})
						.then((smth) => {
						});*/
				} else {
					throw redirect(303, `/slide/${slide.id}`);
				}

			})
			.catch((error) => {
				console.error(error);
			});
	},
	async edit(event) {
		const user = event.locals.user;
		if (!user) {
			return fail(401, { formErrors: ['Please sign in']});
		}

		const formData = Object.fromEntries(await event.request.formData());
		const slideParse = slideSchema.safeParse(formData);
		if (!slideParse.success) {
			return fail(400, slideParse.error.formErrors);
		}
		await prisma.slide.update({
			where: {
				id: slideParse.data.id,
			},
			data: slideParse.data,
		})
			.then((slide) => {
				console.log(slide);
				throw redirect(303, `/slide/${slide.id}`);
			})
			.catch((error) => {
				console.error(error);
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

		const deletedSlide = await prisma.slide.delete({
			where: {
				id: deleteParse.data.id,
			},
		});
		throw redirect(303, `/experiment/${deletedSlide.experimentId}`);
	},
};

/** */
export function load() {
	throw redirect(302, '/projects');
}
