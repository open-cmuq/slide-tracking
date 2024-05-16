import { prisma } from '$lib/prisma';

/**
 * @typedef {import('@prisma/client').Project} Project
 * @typedef {import('@prisma/client').Experiment} Experiment
 * @typedef {import('@prisma/client').Slide} Slide
 * @typedef {import('@prisma/client').Coverslip} Coverslip
 */

/**
 * @param {string} id
 * @returns {Promise<import('$types').BreadcrumbProject>}
 */
export async function project(id) {
	const project = /** @type {Project} */(await prisma.project
		.findFirst({
			where: { id },
		}));

	return {
		type: 'project',
		...project,
	};
}

/**
 * @param {string} id
 * @returns {Promise<import('$types').BreadcrumbExperiment>}
 */
export async function experiment(id) {
	const experiment = /** @type {Experiment} */(await prisma.experiment
		.findFirst({
			where: { id },
		}));

	return {
		type: 'experiment',
		...experiment,
	};
}

/**
 * @param {string} id
 * @returns {Promise<import('$types').BreadcrumbSlide>}
 */
export async function slide(id) {
	const slide = /** @type {Slide} */(await prisma.slide
		.findFirst({
			where: { id },
		}));

	return {
		type: 'slide',
		...slide,
	};
}

/**
 * @param {string} id
 * @returns {Promise<import('$types').BreadcrumbCoverslip>}
 */
export async function coverslip(id) {
	// Adds the position of the coverslip within the slide as title
	// e.g `Coverslip 2`
	/** @type {[import('$types').BreadcrumbCoverslip]} */
	const [coverslip] = await prisma.$queryRaw`
		WITH cte AS (
			SELECT *,
				row_number() OVER (
					PARTITION BY slideId
					ORDER BY createdAt
				) AS pos
			FROM Coverslip
		)
		SELECT
			*,
			'Coverslip ' || pos as title,
			'coverslip' AS type
		FROM cte
		WHERE id = ${id}
		LIMIT 1
	`;

	return coverslip;
}

/**
 * @param {{
 *     projectId?: string;
 *     experimentId?: string;
 *     slideId?: string;
 *     coverslipId?: string;
 * }} breadcrumbTrail
 *
 * @returns {Promise<import('$types').Breadcrumb[]>}
 */
export async function findAll(breadcrumbTrail) {
	const getters = /** @type {const} */([
		['projectId', project],
		['experimentId', experiment],
		['slideId', slide],
		['coverslipId', coverslip],
	]);
	const promises = [];
	for (const [type, get] of getters) {
		const id = breadcrumbTrail[type];
		if (id) promises.push(get(id));
	}

	/** @type {import('$types').BreadcrumbRoot} */
	const root = {
		type: 'root',
		name: 'own',
		title: 'My projects',
	};
	return [root, ...await Promise.all(promises)];
}


