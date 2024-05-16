import { json } from '@sveltejs/kit';
import { prisma } from '$lib/prisma';

/** @type {import('./$types').RequestHandler} */
export async function GET({ locals }) {
	const projects = await prisma.project.findMany({
		where: {
			createdByUserId: locals.user.id,
		},
	});

	return json(projects);
}
