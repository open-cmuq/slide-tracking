// @ts-nocheck
import { error } from '@sveltejs/kit';
import { prisma } from '$lib/prisma';
import { q } from '$lib/query';

/** @param {Parameters<import('./$types').PageServerLoad>[0]} event */
export async function load(event) {
	const { locals, params } = event;
	const project = await prisma.project.findFirst({
		where: {
			id: params.projectId,
			createdByUserId: locals.user.id,
		},
		include: {
			experiments: {
				include: {
					createdBy: true,
				},
			},
		},
	});
	if (!project) throw error(404, 'Not found');

	return {
		breadcrumbs: await q.breadcrumbs.findAll({
			projectId: params.projectId,
		}),
		project,
	};
}
