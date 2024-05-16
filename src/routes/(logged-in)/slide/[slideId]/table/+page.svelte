<script>
	import { Breadcrumb, CoverslipTable, MdiIcon, Item, ButtonItem, ItemListDivider } from '$lib/components';
	import { format } from 'date-fns';
	import '@kwangure/strawberry/default/button';

	import { getContext, onMount } from 'svelte';
	import { mdiCheck, mdiChevronRight, mdiNoteEdit, mdiPen, mdiPhoneReturn, mdiPlus, mdiPrinter } from '@mdi/js';
	import { page } from '$app/stores';

	$: ({ slideId } = $page.params);
	

	/** @type {import('$types').Prompt} */
	const prompt = getContext('prompt');

	/** @type {import('./$types').PageServerData} */
	export let data;

</script>

<svelte:head>
	<title>{data.slide.title} | Slide Tracking</title>
</svelte:head>

<Breadcrumb.Bar>
	<Breadcrumb.Link href='/projects'>
		My projects
	</Breadcrumb.Link>
	<MdiIcon d={mdiChevronRight}/>
	<Breadcrumb.List/>
	<MdiIcon d={mdiChevronRight}/>
	<Breadcrumb.Link href='/slide/{slideId}'>
		{data.slide.title}
	</Breadcrumb.Link>

</Breadcrumb.Bar>

<div class="wrapper">
	{#if data.slide.type == 'plate'}
		<div class="center content">
			<div class="table-title">Table with information for a plate {data.slide.title}</div>
			<CoverslipTable coverslips={data.slide.coverslips} />
		</div>
	{/if}
</div>

<style>
	.table-title {
		font-size: var(--br-size-5);
	}
    .center {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
    }

    .content {
        --icon-size: var(--br-size-11);
        font-size: var(--br-size-4);
        color: var(--br-dark, #b0b0b0) var(--br-light, #888);
        flex: none;
    }

</style>