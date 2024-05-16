<script>
	import { Breadcrumb, ButtonItem, EmptyList, Item, ItemList, ItemListDivider, MdiIcon } from '$lib/components';
	import { getContext } from 'svelte';
	import { mdiChevronRight } from '@mdi/js';
	import { page } from '$app/stores';
	import { createQRCode } from '$lib/qrcode';

	$: ({ experimentId } = $page.params);


	/** @type {import('$types').Prompt} */
	const prompt = getContext('prompt');

	/** @type {import('./$types').PageData} */
	export let data;

	/**
	 * @typedef {import('@prisma/client').Slide} Slide
	 **/

	const toDate = (/** @type {Slide} */{ createdAt }) => createdAt;
	const toLink = (/** @type {Slide} */{ id }) => ({
		href: `/slide/${id}`,
	});
	const toName = (/** @type {Slide} */{ title }) => title;

</script>

<svelte:head>
	<title>{data.experiment.title} | Slide Tracking</title>
</svelte:head>

<Breadcrumb.Bar>
	<Breadcrumb.Link href='/projects'>
		My projects
	</Breadcrumb.Link>
	<MdiIcon d={mdiChevronRight}/>
	<Breadcrumb.List/>
	<MdiIcon d={mdiChevronRight}/>
	<Item.Dropdown title={data.experiment.title}>
		<ButtonItem on:click={prompt.experiment.bind(null, 'edit', data.experiment)}>
			Edit experiment
		</ButtonItem>
		<ButtonItem on:click={prompt.deleteExperiment.bind(null, data.experiment)}>
			Delete experiment
		</ButtonItem>
		<ItemListDivider/>
		<ButtonItem on:click={prompt.slide.bind(null, 'create', { experimentId })}>
			Add slide/plate
		</ButtonItem>
		
	</Item.Dropdown>
</Breadcrumb.Bar>

{#if data.experiment.slides.length}
	<ItemList items={data.experiment.slides} {toDate} {toName} {toLink}>
		<svelte:fragment slot='drop-menu' let:item>
			{@const slide = /** @type {Slide} */(item)}
			<ButtonItem on:click={() => prompt.slide('edit', slide)}>
				{(slide.type === 'plate' ? 'Edit plate' : 'Edit slide')}
			</ButtonItem>
			<ButtonItem on:click={() => prompt.deleteSlide(slide)}>
				{(slide.type === 'plate' ? 'Delete plate' : 'Delete slide')}
			</ButtonItem>
		</svelte:fragment>
	</ItemList>
{:else}
	{#if data.experiment}
		<EmptyList>
			Slides for '{data.experiment.title}' will appear here when you add them
		</EmptyList>
	{:else}
		<EmptyList>
			Slides for this experiment will appear here when you sign in
		</EmptyList>
	{/if}
{/if}

