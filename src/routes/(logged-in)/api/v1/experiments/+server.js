import { json } from '@sveltejs/kit';
import { prisma } from '$lib/prisma';

/** @type {import('./$types').RequestHandler} */
export async function GET({ locals }) {
	const experiments = await prisma.experiment.findMany({
		where: {
			createdByUserId: locals.user.id,
		},
	});

	return json(experiments);
}
