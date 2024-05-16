<script>
	import { Coverslip, DialogForm, Group, Input, Radio, Slide } from '$lib/components';

	/** @type {boolean} */
	export let open;

    let coverslipids = [""]; 
    let slideid;
	export { coverslipids as coverslipids };
    export { slideid as slideid };

</script>

<DialogForm header='Edit wells' bind:open action='/coverslip/{coverslipids[0]?.id}?/edits'
    --br-dialog-root-max-block-size="min(90dvb, 100%);">
    <input type="hidden" name="ids" value={coverslipids} />
	<input type='hidden' name='slideId' value={slideid}/>
	<input type='hidden' name='positionX' value={0}/>
	<input type='hidden' name='positionY' value={0}/>
	<input type='hidden' name='shape' value={'round'}/>
	<div class="wrapper">
			<div class="single-column">
				<Input label='Specimen' name='specimen' placeholder='Specimen' value="" required/>
			</div>
			<div class="single-column">
				<Input label='Coating' name='coating' placeholder='Coating' value="" required/>
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