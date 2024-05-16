import { error } from '@sveltejs/kit';
import { FILE_UPLOAD_DIR } from '$lib/env';
import fs from 'node:fs/promises';
import path from 'node:path';
import { prisma } from '$lib/prisma';
import { zip } from 'fflate';

/** @type {import('./$types').RequestHandler} */
export async function GET({ locals, url }) {
	const query = url.searchParams.getAll('id');
	if (query.length < 1) throw error(400);

	const coverslips = await prisma.coverslipFile.findMany({
		where: {
			id: {
				in: query,
			},
			createdByUserId: locals.user.id,
		},
	});
	if (coverslips.length < query.length) throw error(404);

	const fileBuffers = await Promise.all(coverslips.map((file) => {
		const filepath = path.join(FILE_UPLOAD_DIR, file.id);
		return fs.readFile(filepath);
	}));
	if (fileBuffers.length === 1) return new Response(fileBuffers[0]);

	const zipped = await new Promise((resolve) => {
		/** @type {import('fflate').AsyncZippable} */
		const zippables = {};
		for (let i = 0; i < fileBuffers.length; i++) {
			zippables[coverslips[i].name] = fileBuffers[i];
		}
		zip(zippables, (_, result) => {
			resolve(result);
		});
	});

	return new Response(zipped);
}
