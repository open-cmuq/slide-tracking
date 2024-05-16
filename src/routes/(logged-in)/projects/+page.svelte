<script>
	import { Breadcrumb, ButtonItem, EmptyList, Item, ItemList, TitledLayout } from '$lib/components';
	import { getContext } from 'svelte';

	/** @type {import('$types').Prompt} */
	const prompt = getContext('prompt');

	/** @type {import('./$types').PageData} */
	export let data;

	/**
	 * @typedef {import('@prisma/client').Project} Project
	 **/

	const toDate = (/** @type {Project} */{ createdAt }) => createdAt;
	const toLink = (/** @type {Project} */{ id }) => ({
		href: `/project/${id}`,
	});
	const toName = (/** @type {Project} */{ title }) => title;
</script>

<svelte:head>
	<title>Projects | Slide Tracking</title>
</svelte:head>

<TitledLayout title='Projects'>
	<Breadcrumb.Bar>
		<Item.Dropdown title='My Projects'>
			<ButtonItem on:click={() => prompt.project('create')}>
				Create project
			</ButtonItem>
		</Item.Dropdown>
	</Breadcrumb.Bar>
	{#if data.projects.length}
		<ItemList items={data.projects} {toDate} {toLink} {toName}>
			<svelte:fragment slot='drop-menu' let:item>
				{@const project = /** @type {Project} */(item)}
				<ButtonItem on:click={() => prompt.project('edit', project)}>
					Edit project
				</ButtonItem>
				<ButtonItem on:click={() => prompt.deleteProject(project)}>
					Delete project
				</ButtonItem>
			</svelte:fragment>
		</ItemList>
	{:else}
		<EmptyList>
			Your projects will appear here when you add them
		</EmptyList>
	{/if}
</TitledLayout>

