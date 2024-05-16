<script>
	import { Coverslip, DialogForm, Group, Input, Radio, Slide } from '$lib/components';

	/**
	 * @typedef {import('@prisma/client').Coverslip} PrismaCoverslip
	 */

	/** @type {boolean} */
	export let open;
	/** @type {PrismaCoverslip | undefined} */
	let editedCoverslip;
	export { editedCoverslip as coverslip };

	/** @type {PrismaCoverslip[]} */
	let coverslips = [];

	$: if (open) updateCoverslips();

	async function updateCoverslips() {
		coverslips = await fetch(`/api/v1/coverslips?slideId=${editedCoverslip?.slideId}`)
			.then((response) => response.json())
			.catch((error) => {
				console.error(error);
			});
	}
</script>

<DialogForm header='Edit coverslip' bind:open action='/coverslip/{editedCoverslip?.id}?/edit'
	--br-dialog-root-max-block-size="min(90dvb, 100%);">
	<input type='hidden' name='id' value={editedCoverslip?.id}/>
	<input type='hidden' name='slideId' value={editedCoverslip?.slideId}/>
	<input type='hidden' name='positionX' value={editedCoverslip?.positionX}/>
	<input type='hidden' name='positionY' value={editedCoverslip?.positionY}/>
	<div class="wrapper">
		<Slide slideId={editedCoverslip?.slideId}>
			{#each coverslips as coverslip, i}
				{#if coverslip.id === editedCoverslip?.id}
					<Coverslip coverslip={editedCoverslip} active draggable
						on:position={({ detail }) => {
							// Help typescript out
							if (editedCoverslip) {
								editedCoverslip.positionX = detail.positionX;
								editedCoverslip.positionY = detail.positionY;
							}
						}}>
						#{i + 1}
					</Coverslip>
				{:else}
					<Coverslip {coverslip}>
						#{i + 1}
					</Coverslip>
				{/if}
			{/each}
		</Slide>
		<div>
			<div class="single-column">
				<Input label='Specimen' name='specimen' placeholder='Specimen' value={editedCoverslip?.specimen} required/>
			</div>
			<div class="single-column">
				<Input label='Coating' name='coating' placeholder='Coating' value={editedCoverslip?.coating} required/>
			</div>
			<Group label='Shape' name='shape' on:change={({ detail }) => {
				if (editedCoverslip) editedCoverslip.shape = detail;
			}}>
				<div class="double-column">
					<Radio label='Round' value='round' checked={editedCoverslip?.shape === 'round'}/>
					<Radio label='Square' value='square' checked={editedCoverslip?.shape === 'square'}/>
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