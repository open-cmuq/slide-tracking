<script>
	import '@kwangure/strawberry/default/item';
	import { mdiChevronDown, mdiChevronRight } from '@mdi/js';
	import { MdiIcon } from '$lib/components';
	import { page } from '$app/stores';

	/**
	 * It is generally used to highlight parent and grandparent-parent
	 * items in a heirarchy of links. Use `current` to highlight the
	 * page of the current link
	 *
	 * @type {boolean}
	 */
	export let active = false;
	/** @type {string} */
	export let href;
	/** @type {boolean} */
	export let open;

	/** @type {'page' | null} */
	$: current = $page.url.pathname === href ? 'page' : null;
	/** @type {'true' | null} */
	$: selected = current ? 'true' : null;
</script>

<div class="br-list-item" class:active aria-selected={selected}>
	<button class='br-ignore unbutton'>
		{#if open}
			<MdiIcon d={mdiChevronDown}/>
		{:else}
			<MdiIcon d={mdiChevronRight}/>
		{/if}
	</button>
	<a {href} aria-current={current} class='overflow-ellipsis'>
		<slot></slot>
	</a>
</div>

<style>
	.br-list-item {
		--br-list-item-padding-inline: var(--br-size-2);
	}
	a,
	button {
		display: flex;
		align-items: center;
	}
	button {
		--icon-size: 20px;
	}
	a {
		display: block;
		flex: 1;
	}
	.active:not([aria-current]):not([aria-selected]) {
		background-color: var(--br-light, rgb(240, 240, 240)) var(--br-dark, #333);
	}
	.active:not([aria-current]):not([aria-selected]):hover {
		background-color: var(--br-light, rgb(230, 230, 230)) var(--br-dark, #555);
	}
</style>