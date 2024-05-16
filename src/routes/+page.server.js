import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export function load({ locals }) {
	if (locals.user) {
		throw redirect(302, '/projects');
	}
	/** @type {import('$types').Breadcrumb[]} */
	const breadcrumbs = [{
		type: 'root',
		name: 'own',
		title: 'My projects',
	}];

	return {
		breadcrumbs,
		session: locals.session || null,
		user: undefined,
	};
}
