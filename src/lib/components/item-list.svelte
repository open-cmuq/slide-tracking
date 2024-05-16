<script>
	import { format, isToday } from 'date-fns';
	import { DropMenu } from '.';

	/** @type {any[]} */
	export let items;
	/**
	 * Coverts an item to an ISODateString, epoch time or Date object
	 * @type {(item: any) => string | number | Date}
	 */
	export let toDate;
	/** @type {(item: any) => { href: string; download?: string; } | null} */
	export let toLink = () => null;
	/** @type {(item: any) => string} */
	export let toName;

	/**
	 * @param {string | number | Date} dirtyDate
	 */
	function renderDate(dirtyDate) {
		const date = new Date(dirtyDate);
		if (isToday(date)) return format(date, 'h:mm a');
		return format(date, 'MMM dd, yyyy');
	}
</script>

<div class="list" class:drop-menu={$$slots['drop-menu']}>
	<div class="head cell name first">Name</div>
	<div class="head cell owner">Owner</div>
	<div class="head cell" class:last={!$$slots['drop-menu']}>Created at</div>
	<div class="head cell drop-menu last"></div>
	{#each items as item}
		{@const date = toDate(item)}
		{@const link = toLink(item)}
		{#if link}
			<a href={link.href} download={link.download || null}>
				<div class="cell name first">
					<div class="overflow-ellipsis">
						{toName(item)}
					</div>
				</div>
				<div class="cell owner">{item.createdBy.name}</div>
				<div class="cell">{renderDate(date)}</div>
			</a>
		{:else}
			<div class="cell name first">
				<div class="overflow-ellipsis">
					{toName(item)}
				</div>
			</div>
			<div class="cell owner">{item.createdBy.name}</div>
			<div class="cell" class:last={!$$slots['drop-menu']}>{renderDate(date)}</div>
		{/if}
		{#if $$slots['drop-menu']}
			<div class="cell last">
				<DropMenu>
					<slot name="drop-menu" item={item}/>
				</DropMenu>
			</div>
		{/if}
	{/each}
</div>

<style>
	.list {
		--item-list-gap: var(--br-size-4);
	}
	.list {
		display: grid;
		--name-column: minmax(var(--br-size-16), 1fr);
		--created-by-column: var(--br-size-16);
		--created-at-column: var(--br-size-14);
		--dropmenu-column: var(--br-size-8);
		--gtc-mobile-up: var(--name-column) var(--created-by-column);
		--gtc-desktop-up: var(--name-column) var(--created-by-column) var(--created-at-column);
		grid-template-columns:  var(--br-mobile, var(--gtc-mobile-up))
			var(--br-tablet-portrait, var(--gtc-mobile-up))
			var(--br-tablet-landscape, var(--gtc-mobile-up))
			var(--br-desktop, var(--gtc-desktop-up))
			var(--br-big-desktop, var(--gtc-desktop-up));
		gap: 0 var(--item-list-gap);
	}
	.list.drop-menu {
		--gtc-mobile-up: var(--name-column) var(--created-at-column) var(--dropmenu-column);
		--gtc-desktop-up: var(--name-column) var(--created-by-column) var(--created-at-column) var(--dropmenu-column);
	}
	.cell.drop-menu {
		display: flex;
		justify-content: center;
	}
	.list:not(.drop-menu) .drop-menu {
		display: none;
	}
	a {
		display: contents;
	}
	.cell {
		display: flex;
		align-items: center;
		height: var(--br-size-10);
		position: relative;
	}
	.cell.first {
		padding-inline-start: var(--br-size-3);
	}
	.cell.last {
		padding-inline-end: var(--br-size-3);
	}
	.cell:after {
		display: block;
		content: ' ';
		position: absolute;
		border-bottom: var(--br-global-border);
		width: calc(100% + var(--item-list-gap));
		transform: translateX(-50%);
		left: 50%;
		bottom: 0;
	}
	.cell.first:after {
		left: calc(50% + var(--item-list-gap) / 2);
	}
	.cell.last:after {
		left: calc(50% - var(--item-list-gap) / 2);
	}
	.head {
		font-weight: 600;
		height: var(--br-size-9);
	}
	.owner {
		--display-mobile-up: none;
		--display-desktop-up: flex;
		display: var(--br-mobile, var(--display-mobile-up))
			var(--br-tablet-portrait, var(--display-mobile-up))
			var(--br-tablet-landscape, var(--display-mobile-up))
			var(--br-desktop, var(--display-desktop-up))
			var(--br-big-desktop, var(--display-desktop-up));
	}
</style>