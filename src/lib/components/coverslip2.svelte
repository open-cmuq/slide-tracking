<script>
	import { createEventDispatcher, tick } from 'svelte';

	export let active = false;
	/** @type {string} */
	export let href = '';
	/** @type {Partial<import('@prisma/client').Coverslip>} */
	export let coverslip;

	const SEARCH_MIN_X = 0.275;
	const SEARCH_MIN_Y = 0.125;
	const SEARCH_MAX_X = 0.725;
	const SEARCH_MAX_Y = 0.875;

	$: ({ positionX = SEARCH_MIN_X, positionY = SEARCH_MIN_Y, shape = 'round' } = coverslip);

</script>

{#if href}
	<a href={href} class='coverslip' class:active class:round={shape === 'round'}
		style:--pos-x={positionX} style:--pos-y={positionY}>
		<slot/>
	</a>
{:else}
	<div class='coverslip' class:active class:round={shape === 'round'}
		style:--pos-x={positionX} style:--pos-y={positionY}>
		<slot/>
	</div>
{/if}

<style>
	.coverslip {
		width: calc(var(--st-slide-width) * 0.45);
		aspect-ratio: 1;
		background-color:
			var(--br-dark, rgba(255,255,255, 0.1))
			var(--br-light, rgba(0, 0, 0, 0.05));
			display: flex;
		align-items: center;
		justify-content: center;
		font-size: 20px;
		border-radius: 2px;
		cursor: pointer;
		transform: translate(-50%, -50%);
		left: calc(var(--pos-x) * 100%);
		top: calc(var(--pos-y) * 100%);
	}
	div.coverslip.active {
		cursor: default;
	}
	:global(.slide-surface) .coverslip {
		position: absolute;
	}
	.coverslip.round {
		border-radius: 50%;
	}
	.coverslip.active {
		background-color: var(--br-dark, hsl(225deg 100% 60%))
			var(--br-light, hsl(225deg 100% 55%));
	}
</style>