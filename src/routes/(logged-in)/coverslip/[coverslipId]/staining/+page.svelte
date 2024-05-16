<script>
	import { EmptyList, Item } from '$lib/components';
	import { getContext } from 'svelte';
	import { stainingFields } from '$lib/components/forms/stainining_fields';

	/** @type {import('./$types').PageServerData} */
	export let data;

	/** @type {import('$types').Prompt} */
	const prompt = getContext('prompt');
</script>

<div class="stainings">
	{#if data.stainings.length}
		<div class="double-column">
			{#each data.stainings as staining, i}
				<div>
					<Item.Dropdown title="Staining #{i+1}">
						<Item.Button on:click={prompt.editStaining.bind(null, staining)}>
							Edit staining
						</Item.Button>
						<Item.Button on:click={prompt.deleteStaining.bind(null, staining)}>
							Delete staining
						</Item.Button>
					</Item.Dropdown>
					{#each staining.fields as field}
						<div class="item">
							<div class='field'>
								{stainingFields[/** @type {keyof stainingFields}*/(field.name)]}
							</div>
							<div class='value'>{field.value}</div>
						</div>
					{/each}
				</div>
			{/each}
		</div>
	{:else}
		<EmptyList>
			Your stainings will appear here when you add them
		</EmptyList>
	{/if}
</div>

<style>
	.stainings {
		padding-block-start: var(--br-size-3);
	}
	.field,
	.value {
		padding-inline: var(--br-sidebar-section-indent, var(--br-size-3));
	}
	.field {
		padding-block: var(--br-size-3) var(--br-size-2);
		text-transform: uppercase;
		color: var(--br-dark, hsl(0, 0%, 60%)) var(--br-light, hsl(0, 0%, 45%));
		font-size: 12.5px;
		line-height: 1;
	}
</style>