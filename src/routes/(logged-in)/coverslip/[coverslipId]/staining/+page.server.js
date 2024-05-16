import { deleteEntrySchema, editStainingSchema, newStainingSchema } from '$lib/schemas/forms';
import { error, fail } from '@sveltejs/kit';
import { redirectDifferentRoute, redirectSameRoute } from '$lib/server/redirect';
import { nanoid } from 'nanoid';
import { prisma } from '$lib/prisma';
import { q } from '$lib/query';

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
	const { locals, params: { coverslipId }} = event;
	const [breadcrumbs, stainings] = await Promise.all([
		coverslipBreadcrumbs(coverslipId),
		prisma.staining.findMany({
			where: {
				coverslipId,
				createdByUserId: locals.user.id,
			},
			include: {
				fields: true,
			},
		}),
	]);

	return { breadcrumbs, stainings };
}

/**
 * @param {string} coverslipId
 */
async function coverslipBreadcrumbs(coverslipId) {
	/**
	 * @type {[{
	 *     projectId: string;
	 *     experimentId: string;
	 *     slideId: string;
	 *     coverslipId: string;
	 * }]}
	 */
	const [breadcrumbTrail] = await prisma.$queryRaw`
		SELECT
			p.id AS projectId,
			e.id AS experimentId,
			s.id AS slideId,
			c.id AS coverslipId
		FROM Coverslip c
		JOIN Slide s ON s.id = c.slideId
		JOIN Experiment e ON e.id = s.experimentId
		JOIN Project p ON p.id = e.projectId
		WHERE c.id = ${coverslipId};
	`;
	return q.breadcrumbs.findAll(breadcrumbTrail);
}

/** @type {import('./$types').Actions} */
export const actions = {
	async new(event) {
		const user = event.locals.user;
		if (!user) {
			console.log('User not logged in');
			return fail(401, { formErrors: ['Please sign in']});
		}

		const formData = await event.request.formData();

		// Extract the coverslip ID from the form data
		const coverslipId = formData.get('coverslipId');

		// Extract the staining data from the form data
		const stainingFields = Array.from(formData.entries())
			.filter(([key]) => key.startsWith('fields'))
			.map(([key, value]) => {
				const match = key.match(/fields\[(\d+)\]\[(\w+)\]/);
				if (!match) {
					throw error(400, 'Invalid field values');
				}
				const [, index, field] = match;
				return { index: Number(index), field, value };
			})
			.reduce((acc, { index, field, value }) => {
				acc[index] = acc[index] || {};
				acc[index][field] = value;
				return acc;
			}, /** @type {Record<string, any>[]}*/([]));

		// Validate the staining data
		const stainingParse = newStainingSchema.safeParse({
			coverslipId,
			fields: stainingFields,
		});

		if (!stainingParse.success) {
			return fail(400, stainingParse.error.formErrors);
		}

		// Create the new stainings
		prisma.staining.create({
			data: {
				...stainingParse.data,
				fields: {
					create: stainingParse.data.fields.map((field) => ({
						...field,
						id: nanoid(),
						createdByUserId: user.id,
					})),
				},
				id: nanoid(),
				createdByUserId: user.id,
			},
		}).then((staining) => {
			console.log('New staining created!');
		})
			.catch((error) => {
				console.error(error);
				return fail(400, error);
			});


		redirectDifferentRoute(event, `/coverslip/${coverslipId}/staining`);
	},
	async edit(event) {
		const { locals, request } = event;
		let formData;
		await request.formData().then((data) => {
			formData = data;
		})
			.catch((error) => {
				console.error(error);
				return fail(400, error);
			});


		/**
		 * @type {{
		 *     index: number,
		 *     name: string;
		 *     value: string;
		 * }[]}
		 */
		const stainingFields = [];
		for (const [key, formDataValue] of formData) {
			if (!key.startsWith('fields')) continue;

			const match = key.match(/fields\[(\d+)\]\[(\w+)\]/);
			if (!match) throw error(400, 'Invalid field values');

			const index = Number(match[1]);
			const field = /** @type {'name' | 'value'} */(match[2]);

			stainingFields[index] = stainingFields[index] || {};
			stainingFields[index][field] = /** @type {string} */(formDataValue);
		}


		const coverslipId = /** @type {string} */(formData.get('coverslipId'));
		const id = /** @type {string} */(formData.get('id'));
		// Validate the staining data
		const stainingParse = editStainingSchema.safeParse({
			coverslipId,
			fields: stainingFields,
			id,
		});

		if (!stainingParse.success) {
			return fail(400, stainingParse.error.formErrors);
		}

		/**
		 * @param {import('$lib/schemas/forms').StainingFieldOp} field
		 * @returns {field is import('$lib/schemas/forms').CreateStainingFieldOp}
		 */
		function isCreateField(field) {
			return field.op === 'create';
		}
		/**
		 * @param {import('$lib/schemas/forms').StainingFieldOp} field
		 * @returns {field is import('$lib/schemas/forms').EditStainingFieldOp}
		 */
		function isEditField(field) {
			return field.op === 'edit';
		}
		/**
		 * @param {import('$lib/schemas/forms').StainingFieldOp} field
		 * @returns {field is import('$lib/schemas/forms').DeleteStainingFieldOp}
		 */
		function isDeleteField(field) {
			return field.op === 'delete';
		}

		await prisma.staining.update({
			where: {
				id: stainingParse.data.id,
			},
			data: {
				...stainingParse.data,
				fields: {
					create: stainingParse.data.fields
						.filter(isCreateField)
						.map(({ op: _, ...field }) => ({
							...field,
							id: nanoid(),
							createdByUserId: locals.user.id,
						})),
					deleteMany: stainingParse.data.fields
						.filter(isDeleteField)
						.map(({ op: _, ...field }) => field),
				},
				id: nanoid(),
				createdByUserId: locals.user.id,
			},
		});

		const toUpdate = stainingParse.data.fields
			.filter(isEditField)
			.map(({ op: _, ...field }) => field);
		// Promise.all fails (https://github.com/prisma/prisma/issues/9465). Go one by one.
		// eslint-disable-next-line no-unused-vars
		for (const field of toUpdate) {
			await prisma.stainingField.update({
				where: { id: field.id },
				data: field,
			});
		}

		redirectDifferentRoute(event, `/coverslip/${coverslipId}/staining`);
	},
	async delete(event) {
		const formData = Object.fromEntries(await event.request.formData());
		const deleteParse = deleteEntrySchema.safeParse(formData);

		if (!deleteParse.success) {
			return fail(400, deleteParse.error.formErrors);
		}
		const deletedStaining = await prisma.staining.delete({
			where: {
				id: deleteParse.data.id,
			},
		});
		redirectSameRoute(event, `/coverslip/${deletedStaining.coverslipId}`);
	},
};
