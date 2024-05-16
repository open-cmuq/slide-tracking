<script>
	import { EmptyList, Item, ItemList } from '$lib/components';
	import { getContext } from 'svelte';

	/** @type {import('./$types').PageServerData} */
	export let data;

	/**
	 * @typedef {import('@prisma/client').CoverslipFile} CoverslipFile
	 **/

	/** @type {import('$types').Prompt} */
	const prompt = getContext('prompt');
	const toDate = (/** @type {CoverslipFile} */{ createdAt }) => createdAt;
	const toLink = (/** @type {CoverslipFile} */{ id, name }) => ({
		href: `/api/v1/files/download?id=${id}`,
		download: name,
	});
	const toName = (/** @type {CoverslipFile} */{ name }) => name;
</script>

<div class="files">
	{#if data.files.length}
		<ItemList items={data.files} {toDate} {toName} {toLink}>
			<svelte:fragment slot='drop-menu' let:item>
				{@const file = /** @type {CoverslipFile} */(item)}
				<Item.Button on:click={() => prompt.deleteFile(file)}>
					Delete file
				</Item.Button>
			</svelte:fragment>
		</ItemList>
	{:else}
		<EmptyList>
			Your files will appear here when you add them
		</EmptyList>
	{/if}
</div>

<style>
	.files {
		padding-block-start: var(--br-size-4);
	}
</style>