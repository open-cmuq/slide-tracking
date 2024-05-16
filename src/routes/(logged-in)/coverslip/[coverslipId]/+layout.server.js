import { error } from '@sveltejs/kit';
import { prisma } from '$lib/prisma';
import { q } from '$lib/query';

/**
 * @typedef {import('@prisma/client').Slide & {
 *    slideIndex: number;
 * }} AugmentedSlide
 * @typedef {import('@prisma/client').User} User
 */

/** @type {import('./$types').LayoutServerLoad} */
export async function load(event) {
	const { locals, params } = event;
	const coverslip = await prisma.coverslip.findFirst({
		where: {
			id: params.coverslipId,
			createdByUserId: locals.user.id,
		},
		include: {
			slide: true,
		},
	});
	if (!coverslip) throw error(404, 'Not Found');

	const coverslips = await prisma.coverslip.findMany({
		where: {
			slideId: coverslip.slideId,
		},
	});

	// Resolve in parallel to avoid waterfall
	const [breadcrumbs, session] = await Promise.all([
		coverslipBreadcrumbs(params.coverslipId),
		locals.getSession(),
	]);

	return {
		coverslips,
		current: coverslip,
		session,
		breadcrumbs,
	};
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

