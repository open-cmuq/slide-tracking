/* eslint-disable import/no-named-as-default-member, import/no-named-as-default, import/default, import/no-unresolved */
/* import {
	AUTHJS_SECRET,
	GOOGLE_AUTH_CLIENT_ID,
	GOOGLE_AUTH_SECRET,
} from '$env/static/private';
*/
import { config } from 'dotenv';
config();

const AUTHJS_SECRET = process.env.AUTHJS_SECRET;
const GOOGLE_AUTH_CLIENT_ID = process.env.GOOGLE_AUTH_CLIENT_ID;
const GOOGLE_AUTH_SECRET = process.env.GOOGLE_AUTH_SECRET;

import Google from '@auth/core/providers/google';
import { fail, json } from '@sveltejs/kit';
import { nanoid } from 'nanoid';
import { newUserSchema } from '$lib/schemas/forms';
import { prisma } from '$lib/prisma';
import { sequence } from '@sveltejs/kit/hooks';
import { SvelteKitAuth } from '@auth/sveltekit';


/* const AUTHJS_SECRET = '8bdae28cdfd00fe52e2dd657e359d2ee';
const GOOGLE_AUTH_CLIENT_ID = '648431299087-r9ngev5ucea2mnreags0hm3jp7j0boh8.apps.googleusercontent.com';
const GOOGLE_AUTH_SECRET = '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';
*/

const authenticate = SvelteKitAuth({
	trustHost: true,
	callbacks: {
		async signIn({ user: { email, name }}) {
			if (!email || !name) return false;

			const user = await prisma.user.findUnique({ where: { email }});
			if (user) return true;

			const userParse = newUserSchema.safeParse({ email, name });
			if (!userParse.success) {
				return fail(400, userParse.error.formErrors);
			}

			await prisma.user.create({
				data: {
					...userParse.data,
					id: nanoid(),
				},
			}).then((newUser) => {
				console.log('User created');
			})
				.catch((error) => {
					console.error(error);
				});

			return true;
		},
	},
	providers: [
		// @ts-ignore
		Google({
			clientId: GOOGLE_AUTH_CLIENT_ID,
			clientSecret: GOOGLE_AUTH_SECRET,
		}),
	],
	secret: AUTHJS_SECRET,
});

/** @type {import('@sveltejs/kit').Handle} */
async function loadUser({ event, resolve }) {
	const session = await event.locals.getSession();
	if (!session) return resolve(event);

	const user = await prisma.user.findUnique({
		where: {
			email: /** @type {string} */(session.user?.email),
		},
	});

	if (user) {
		// eslint-disable-next-line require-atomic-updates
		event.locals.user = user;
		// eslint-disable-next-line require-atomic-updates
		event.locals.session = session;
	}

	return resolve(event);
}

/** @type {import('@sveltejs/kit').Handle} */
function guardLogin({ event, resolve }) {
	if (event.route.id?.startsWith('/(logged-in)')) {
		if (!event.locals.user) {
			const { url: { protocol, host }} = event;
			const root = new URL(`${protocol}//${host}/`);
			return Response.redirect(root);
		}
	}
	return resolve(event);
}

/** @type {import('@sveltejs/kit').Handle} */
async function redirect({ event, resolve }) {
	const response = await resolve(event);
	const dest = event.url.searchParams.get('redirect');
	if (dest) {
		const isActionJsonRequest
			= response.headers.get('content-type') === 'application/json'
			&& event.request.method === 'POST';
			console.log(dest);
			const url = new URL(decodeURIComponent(dest), 'https://slide-tracking.qatar.cmu.edu'); // your actual domain
			const knownRoutes = ['/api', '/coverslip', '/experiment', '/experiments', '/project', '/projects', '/slide', '/slides', '/table']; // Add all your known routes here

			// validate for route correctness
			if (knownRoutes.includes(url.pathname)) {
				if (isActionJsonRequest) {
					return json({
						type: 'redirect',
						status: 302,
						location: url.toString(),
					});
				}
	
				return Response.redirect(url.toString());
			} else {
				// potential wrong route: redirect to a default or error page
				return isActionJsonRequest ? json({ error: 'Invalid redirect URL' }) : Response.redirect('/error');
			}
		}
	return response;
}

export const handle = sequence(
	authenticate,
	loadUser,
	guardLogin,
	redirect,
);
