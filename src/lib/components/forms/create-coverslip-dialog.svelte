<script>
	import { Coverslip, DialogForm, Group, Input, Radio, Slide } from '$lib/components';

	/** @type {boolean} */
	export let open;
	/** @type {string} */
	export let slideId;

	let shape = 'round';
	/** @type {number} */
	let positionX;
	/** @type {number} */
	let positionY;

	/** @type {import('@prisma/client').Coverslip[]} */
	let coverslips = [];

	$: if (open) updateCoverslips();

	async function updateCoverslips() {
		coverslips = await fetch(`/api/v1/coverslips?slideId=${slideId}`)
			.then((response) => response.json())
			.catch((error) => {
				console.error(error);
			});
	}
</script>

<DialogForm header='Create coverslip' bind:open action='/coverslip/blah?/new'
	--br-dialog-root-max-block-size="min(90dvb, 100%);">
	<input type='hidden' name='slideId' value={slideId}/>
	<input type='hidden' name='positionX' value={positionX}/>
	<input type='hidden' name='positionY' value={positionY}/>
	<div class="wrapper">
		<Slide {slideId}>
			{#each coverslips as coverslip, i}
				<Coverslip {coverslip}>
					#{i + 1}
				</Coverslip>
			{/each}
			{#key coverslips}
				<Coverslip active draggable coverslip={{ positionX, positionY, shape }}
					on:position={(event) => ({ positionX, positionY } = event.detail)}
					position='auto'/>
			{/key}
		</Slide>
		<div>
			<div class="single-column">
				<Input label='Specimen' name='specimen' placeholder='Specimen' required/>
			</div>
			<div class="single-column">
				<Input label='Coating' name='coating' placeholder='Coating' required/>
			</div>
			<Group label='Shape' name='shape' on:change={(event) => shape = event.detail}>
				<div class="double-column">
					<Radio label='Round' value='round' checked/>
					<Radio label='Square' value='square'/>
				</div>
			</Group>
		</div>
	</div>
</DialogForm>

<style>
	.wrapper {
		display: grid;
		grid-template-columns: max-content 1fr;
		gap: var(--br-size-6);
	}
</style>