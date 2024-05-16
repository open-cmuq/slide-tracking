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

<DialogForm header='Edit well' bind:open action='/coverslip/{editedCoverslip?.id}?/edit'
	--br-dialog-root-max-block-size="min(90dvb, 100%);">
	<input type='hidden' name='id' value={editedCoverslip?.id}/>
	<input type='hidden' name='slideId' value={editedCoverslip?.slideId}/>
	<input type='hidden' name='positionX' value={0}/>
	<input type='hidden' name='positionY' value={0}/>
	<input type='hidden' name='shape' value={'round'}/>
	<div class="wrapper">
			<div class="single-column">
				<Input label='Specimen' name='specimen' placeholder='Specimen' value={editedCoverslip?.specimen} required/>
			</div>
			<div class="single-column">
				<Input label='Coating' name='coating' placeholder='Coating' value={editedCoverslip?.coating} required/>
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