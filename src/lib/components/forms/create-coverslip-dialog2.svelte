<script>
    // file for the dialog form for the plate coverslips
import { Coverslip, DialogForm, Group, Input, Radio, Slide } from '$lib/components';

/** @type {boolean} */
export let open;
/** @type {string} */
export let slideId;

const shape = 'round';

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
	<div class="wrapper">
        <div class="single-column">
            <Input label='Specimen' name='specimen' placeholder='Specimen' required/>
        </div>
        <div class="single-column">
            <Input label='Coating' name='coating' placeholder='Coating' required/>
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

