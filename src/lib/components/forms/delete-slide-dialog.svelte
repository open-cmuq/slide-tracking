<script>
	import { DialogForm } from '$lib/components';

	export let open = false;
	/** @type {import('@prisma/client').Slide | undefined} */
	export let slide;

	$: header = slide?.title
		? `Delete '${slide?.title}'?`
		: (slide?.type === 'plate' ? 'Delete plate' : 'Delete slide');

</script>

<DialogForm {header} bind:open action='/slides?/delete' size='narrow'>
	This will delete all nested coverslips and coverslip data, and cannot be undone.
	<input type='hidden' name='id' value={slide?.id}/>
	<footer class="br-dialog-inline-section" slot='footer'>
		<button>Delete</button>
		<button class='br-button-primary' type='reset' on:click={() => open = false}>
			Cancel
		</button>
	</footer>
</DialogForm>