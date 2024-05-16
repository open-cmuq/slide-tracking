<script>
	/** @type {string} */
	export let href;
</script>

<a {href} class='br-list-item'>
	<slot/>
</a>

<style>
	a {
		font-size: var(--br-size-4);
		padding-inline: var(--br-size-3);
	}
</style>