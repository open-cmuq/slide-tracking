// @ts-nocheck
import { prisma } from '$lib/prisma';

/** @param {Parameters<import('./$types').LayoutServerLoad>[0]} event */
export async function load({ locals }) {
	const userId = locals.user.id;

	return {
		breadcrumbs: [],
		experimentCount: prisma.experiment.count({
			where: {
				createdByUserId: userId,
			},
		}),
		projectCount: prisma.project.count({
			where: {
				createdByUserId: userId,
			},
		}),
		projects: prisma.project.findMany({
			include: {
				experiments: {
					include: {
						slides: true,
					},
					orderBy: {
						updatedAt: 'desc',
					},
				},
			},
			where: {
				createdByUserId: userId,
			},
			orderBy: {
				updatedAt: 'desc',
			},
		}),
		session: await locals.getSession(),
		user: locals.user,
	};
}
