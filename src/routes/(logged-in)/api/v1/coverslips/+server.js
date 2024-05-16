import { json } from '@sveltejs/kit';
import { prisma } from '$lib/prisma';

/** @type {import('./$types').RequestHandler} */
export async function GET({ locals, url }) {
	const query = url.searchParams;
	const coverslips = await prisma.coverslip.findMany({
		where: {
			slideId: query.get('slideId') || undefined,
			createdByUserId: locals.user.id,
		},
	});

	return json(coverslips);
}
