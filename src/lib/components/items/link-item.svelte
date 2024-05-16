<script>
	import '@kwangure/strawberry/default/item';
	import { page } from '$app/stores';

	/** @type {string} */
	export let href;
	/**
	 * It is generally used to highlight parent and grandparent-parent
	 * items in a heirarchy of links. Use `current` to highlight the
	 * page of the current link
	 *
	 * @type {boolean}
	 */
	export let active = false;
	/**
	 * Highlight the active page
	 *
	 * @type {'false' | 'page' | null}
	 */
	export let current = null;

	/**
	 * A second `_current` is needed, because we always want to rerender
	 * based on the consumer-provided values of `current` not the previously
	 * computed `_current` value
	 *
	 * @type {typeof current}
	 */
	$: _current = current
		?? (href.startsWith('/') && $page.url.pathname === href
			? 'page'
			: null);
</script>

<a {href} class="br-list-item" class:active aria-current={_current}>
	<slot/>
</a>

<style>
	.active:not([aria-current]) {
		background-color: var(--br-light, rgb(240, 240, 240)) var(--br-dark, #333);
	}
	.active:not([aria-current]):hover {
		background-color: var(--br-light, rgb(230, 230, 230)) var(--br-dark, #555);
	}
</style>
