import { redirect } from '@sveltejs/kit';

/**
 * Useful for redirecting deleted items that POST to a path
 * with the deleted id
 *
 * @param {import("@sveltejs/kit").RequestEvent} event
 * @param {string} to
 */
export function redirectSameRoute(event, to) {
	// 'referer' typo in spec is preserved
	const referrer = event.request.headers.get('referer');
	if (referrer) {
		const url = new URL(referrer);
		if (event.url.host === url.host
			&& event.url.pathname === url.pathname) {
			throw redirect(302, to);
		}
	}
}

/**
 * Useful for redirecting to a page only when you're not already on that page
 * for actions that can be run from multiple pages
 *
 * @param {import("@sveltejs/kit").RequestEvent} event
 * @param {string} to
 */
export function redirectDifferentRoute(event, to) {
	// 'referer' typo in spec is preserved
	const referrer = event.request.headers.get('referer');
	if (referrer) {
		const url = new URL(referrer);
		if (event.url.host !== url.host
			|| event.url.pathname !== url.pathname) {
			throw redirect(302, to);
		}
	}
}
