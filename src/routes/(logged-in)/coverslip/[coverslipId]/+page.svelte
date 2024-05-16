<script>
    import { mdiPlus, mdiNoteEdit } from '@mdi/js';
	import {getContext} from 'svelte';
    import { MdiIcon } from '$lib/components';


	/** @type {import('./$types').LayoutServerData} */
	export let data;

	/** @type {import('$types').Prompt} */
	const prompt = getContext('prompt');

	console.log(data);
</script>

<div>
	<div class="item">
		<div>
			<div class='field'>Slide</div>
			<a class='value' href='/slide/{data.current.slide.id}'>
				{data.current.slide.title}
			</a>
		</div>
		<div class="add-staining-container">
			<button on:click={prompt.createStaining.bind(null, data.current.id)}>
				<MdiIcon d={mdiPlus}/>
				Add staining
			</button>
			<button on:click={prompt.editCoverslip.bind(null, data.current)}>
				<MdiIcon d={mdiNoteEdit}/>
				Edit Coverslip
			</button>
		  </div>
		  
	</div>
	<div class="item">
		<div class='field'>Specimen</div>
		<div class='value'>{data.current.specimen}</div>
	</div>
	<div class="item">
		<div class='field'>Coating</div>
		<div class='value'>{data.current.coating}</div>
	</div>
</div>

<style>
	.field,
	.value {
		padding-inline: var(--br-sidebar-section-indent, var(--br-size-3));
	}
	.field {
		padding-block: var(--br-size-4) var(--br-size-2);
		text-transform: uppercase;
		color: var(--br-dark, hsl(0, 0%, 60%)) var(--br-light, hsl(0, 0%, 45%));
		font-size: 12.5px;
		line-height: 1;
	}
	
	.add-staining-container {
		position: absolute;
		top: 20%;
		right: 200px;
	}
</style>