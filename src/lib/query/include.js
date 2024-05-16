import { prisma } from '$lib/prisma';

/**
 * @typedef {import('@prisma/client').User} User
 */

/**
 * @template {{ createdByUserId: string }} T
 * @param {T[]} items
 */
export async function includeCreatedBy(items) {
	const createdByUsers = await prisma.user.findMany({
		where: {
			id: {
				in: items.map(({ createdByUserId }) => createdByUserId),
			},
		},
	});
	/** @type {Map<string, User>} */
	const userMap = new Map(createdByUsers.map((user) => [user.id, user]));
	return items.map((item) => ({
		...item,
		createdBy: /** @type {User} */(userMap.get(item.createdByUserId)),
	}));
}
