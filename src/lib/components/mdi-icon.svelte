<script>
	/** @type {string} */
	export let d;
</script>

<svg viewBox="0 0 24 24">
	<path d={d}></path>
</svg>

<style>
	svg {
		/* Give consumers the ability to override our defaults */
		width: var(--icon-size, 20px);
		height: var(--icon-size, 20px);
		flex: var(--icon-flex, none);
	}
	path {
		fill: var(--icon-color, currentColor);
	}
</style>

