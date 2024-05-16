<script>
	/** @type {string} */
	export let name;
	/** @type {FileList | undefined} */
	export let value = undefined;
	/** @type {boolean} */
	export let multiple = false;

	/**
     * @type {import('svelte/elements').ChangeEventHandler<HTMLInputElement>}
     */
	function fileChange(event) {
		value = event.currentTarget.files ?? undefined;
	}
</script>

<label>
	<input type="file" {multiple} {name} on:change={fileChange}/>
	<slot/>
</label>
