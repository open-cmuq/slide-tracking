<script>
	import { Breadcrumb, ButtonItem, EmptyList, Item, ItemList, ItemListDivider, MdiIcon } from '$lib/components';
	import { getContext } from 'svelte';
	import { mdiChevronRight } from '@mdi/js';
	import { page } from '$app/stores';

	$: ({ projectId } = $page.params);

	/** @type {import('$types').Prompt} */
	const prompt = getContext('prompt');

	/** @type {import('./$types').PageData} */
	export let data;

	/**
	 * @typedef {import('@prisma/client').Experiment} Experiment
	 **/

	/** @type {(item: Experiment) => Date} */
	const toDate = ({ createdAt }) => createdAt;
	const toLink = (/** @type {Experiment} */{ id }) => ({
		href: `/experiment/${id}`,
	});
	/** @type {(item: Experiment) => string} */
	const toName = ({ title }) => title;
</script>

<svelte:head>
	<title>{data.project.title} | Slide Tracking</title>
</svelte:head>

<Breadcrumb.Bar>
	<Breadcrumb.Link href='/projects'>
		My projects
	</Breadcrumb.Link>
	<MdiIcon d={mdiChevronRight}/>
	<Item.Dropdown title={data.project.title}>
		<ButtonItem on:click={prompt.project.bind(null, 'edit', data.project)}>
			Edit project
		</ButtonItem>
		<ButtonItem on:click={prompt.deleteProject.bind(null, data.project)}>
			Delete project
		</ButtonItem>
		<ItemListDivider/>
		<ButtonItem on:click={prompt.experiment.bind(null, 'create', { projectId })}>
			Add experiment
		</ButtonItem>
	</Item.Dropdown>
</Breadcrumb.Bar>

{#if data.project.experiments.length}
	<ItemList items={data.project.experiments} {toDate} {toLink} {toName}>
		<svelte:fragment slot='drop-menu' let:item>
			{@const experiment = /** @type {Experiment} */(item)}
			<ButtonItem on:click={() => prompt.experiment('edit', experiment)}>
				Edit experiment
			</ButtonItem>
			<ButtonItem on:click={() => prompt.deleteExperiment(experiment)}>
				Delete experiment
			</ButtonItem>
		</svelte:fragment>
	</ItemList>
{:else}
	<EmptyList>
		Experiments for '{data.project.title}' will appear here when you add them
	</EmptyList>
{/if}

