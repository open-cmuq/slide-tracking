<script>
	import { DialogForm, Group, Input, Radio, Select } from '$lib/components';
	import { format } from 'date-fns';

	/**
	 * @typedef {import('@prisma/client').Slide} Slide
	 */

	/** @type {'create' | 'edit'} */
	export let op;
	/** @type {boolean} */
	export let open;
	/** @type {Partial<Slide> | undefined} */
	export let slide = undefined;

	$: action = op === 'edit' ? '/slides?/edit' : '/slides?/new';
	$: boxNumber = slide?.boxNumber ?? undefined;
	$: boxPosition = slide?.boxPosition ?? undefined;
	$: comments = slide?.comments ?? '';
	$: experimentId = slide?.experimentId ?? '';
	$: header = op === 'edit' ? (slide?.type === 'plate' ? 'Edit plate' : 'Edit slide') : 'Create slide/plate';
	$: id = slide?.id ?? '';
	$: observedOn = slide?.observedOn
		? format(new Date(slide.observedOn), 'yyyy-MM-dd')
		: new Date().toISOString()
			.split('T')[0];
	$: title = slide?.title ?? '';
	$: type = slide?.type ?? 'slide';

	/** @type {import('@prisma/client').Experiment[]} */
	let experiments = [];

	$: if (open) {
		(async () => {
			experiments = await fetch('/api/v1/experiments')
				.then((response) => response.json())
				.catch(() => []);
		})();
	}
</script>

<DialogForm {header} bind:open {action}>
	{#if op === 'edit'}
		<input type='hidden' name='id' value={id}/>
	{/if}
	<div class="single-column">
		<Input label='Title' name='title' placeholder='Slide/Plate title' value={title} required/>
	</div>
	{#if op != 'edit' }
	<Group label='Choose the type' name='type' on:change={(event) => type = event.detail}>
		<div class="double-column centered">
			<Radio label='Slide' value='slide' checked/>
			<Radio label='Plate' value='plate'/>
		</div>
	</Group>
	{/if}
	<div class="double-column">
		<Select label='Experiment' placeholder='Select an experiment' required name='experimentId'>
			{#each experiments as { id, title } (id)}
				<option value={id} selected={id === experimentId}>{title}</option>
			{/each}
		</Select>
		<Input label='Observed date' name='observedOn'
			value={format(new Date(observedOn), 'yyyy-MM-dd')} required type='date'/>
	</div>
	<div class="double-column">
		<Input label='Box number' name='boxNumber' placeholder='5' min={1}
			value={boxNumber} type='number'/>
		<Input label='Position' name='boxPosition' placeholder='21' min={1}
			value={boxPosition} type='number'/>
	</div>
	<Input label='Comments' name='comments' placeholder='Comments'
		value={comments} type='textarea'/>
</DialogForm>

<style>
	.centered {
		justify-content: center;
	}	
</style>