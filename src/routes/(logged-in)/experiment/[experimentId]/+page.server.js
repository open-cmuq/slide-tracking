import { error } from '@sveltejs/kit';
import { prisma } from '$lib/prisma';
import { q } from '$lib/query';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, params }) {
	const experiment = await prisma.experiment.findFirst({
		where: {
			id: params.experimentId,
			createdByUserId: locals.user.id,
		},
		include: {
			slides: {
				include: {
					createdBy: true,
				},
			},
		},
	});
	if (!experiment) throw error(404, 'Not Found');

	return {
		experiment,
		breadcrumbs: await experimentBreadcrumbs(params.experimentId),
	};
}

/**
 * @param {string} experimentId
 */
async function experimentBreadcrumbs(experimentId) {
	/**
	 * @type {[{
	 *     projectId: string;
	 *     experimentId: string;
	 * }]}
	 */
	const [breadCrumbTrail] = await prisma.$queryRaw`
		SELECT p.id AS projectId, e.id AS experimentId
		FROM Experiment e
		JOIN Project p ON p.id = e.projectId
		WHERE e.id = ${experimentId};
	`;
	return q.breadcrumbs.findAll(breadCrumbTrail);
}
