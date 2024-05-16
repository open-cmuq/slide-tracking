<script>
	import { Breadcrumb, ButtonItem, Coverslip, Item, ItemListDivider, MdiIcon, Plate, Slide } from '$lib/components';
	import { getContext } from 'svelte';
	import { mdiChevronRight } from '@mdi/js';
	import { page } from '$app/stores';

	/** @type {import('./$types').LayoutServerData} */
	export let data;
	

	$: ({ coverslipId } = $page.params);
	$: index = data.coverslips
		.findIndex((coverslip) => coverslip.id === coverslipId);
	$: ({ slideId } = data.coverslips[index]);
	const title_var = data.current.slide.type == 'plate' ? 'Well' : 'Coverslip';
	$: title = `${title_var} #${index + 1}`;

	/** @type {import('$types').Prompt} */
	const prompt = getContext('prompt');
</script>

<svelte:head>
	<title>{title} | Slide Tracking</title>
</svelte:head>

<Breadcrumb.Bar>
	<Breadcrumb.Link href='/projects'>
		My projects
	</Breadcrumb.Link>
	<MdiIcon d={mdiChevronRight}/>
	<Breadcrumb.List/>
	<MdiIcon d={mdiChevronRight}/>
	<Item.Dropdown title={title}>
		<ButtonItem on:click={(title_var == 'Coverslip') ? prompt.editCoverslip.bind(null, data.current) : prompt.editCoverslip2.bind(null, data.current)}>
			Edit {title_var}
		</ButtonItem>
		<ButtonItem on:click={prompt.deleteCoverslip.bind(null, data.current)}>
			Delete {title_var}
		</ButtonItem>
		<ItemListDivider/>
		<Item.Link href='/coverslip/{coverslipId}/staining'>
			View stainings
		</Item.Link>
		<Item.Link href='/coverslip/{coverslipId}/files'>
			View files
		</Item.Link>
		<ItemListDivider/>
		<ButtonItem on:click={prompt.createStaining.bind(null, coverslipId)}>
			Add staining
		</ButtonItem>
		<ButtonItem on:click={prompt.uploadCoverslipFiles.bind(null, coverslipId)}>
			Add file
		</ButtonItem>
	</Item.Dropdown>
</Breadcrumb.Bar>
<div class="wrapper">
	<div class="slide">
		{#if data.coverslips != null && data?.coverslips[0]?.plateIdx === -1}
			<Slide {slideId}>
				
				{#each data.coverslips as coverslip, i}
					{#if coverslip.id === coverslipId}
						<Coverslip {coverslip} active href='/coverslip/{coverslipId}'>
							#{i + 1}
						</Coverslip>
					{:else}
						<Coverslip {coverslip} href='/coverslip/{coverslip.id}'>
							#{i + 1}
						</Coverslip>
					{/if}
				{/each}
			</Slide>
		{:else}
			<Plate {slideId}>
				<div class = "platediv">
					<div class = "plate-grid">
						{#each data.coverslips as coverslip, i}
							{#if coverslip.id === coverslipId}
								<a class = "empty-coverslip active" href = {null}>
									{i+1}
								</a>
							{:else}
								<a class = "empty-coverslip" href = {null}>
									{i+1}
								</a>
							{/if}
						{/each}
					</div>
				</div>
			</Plate>
		{/if}
	</div>
	<div>
		<slot></slot>
	</div>
</div>

<style>
	.wrapper {
		display: grid;
		grid-template-columns: max-content 1fr;
		gap: var(--br-size-6);
	}
	.slide {
		padding-inline: var(--br-size-3);
		padding-block: var(--br-size-4);
	}

	.plate-grid {
		width: 100%;
		height: 100%;
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		gap: 4px; /* adjust as needed */
	}
	.platediv {
		display: flex;
		width: 100%;
		height: 100%;
		padding: 10px;
	}
	.empty-coverslip {
		border: 1px solid #ccc;
		background-color: #f5f5f5;
		border-radius: 50%;
		text-align: center;
		color: rgb(135, 135, 135);
	}
	.active {
		border: 1px solid orange;
		background-color: orange;
	}
</style>