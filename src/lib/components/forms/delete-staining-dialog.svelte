<script>
	import { DialogForm } from '$lib/components';

	export let open = false;
	/** @type {import('@prisma/client').Staining | undefined} */
	export let staining;
</script>

<DialogForm header='Delete staining?' bind:open action='/coverslip/{staining?.id}/staining?/delete' size='narrow'>
	This action cannot be undone.
	<input type='hidden' name='id' value={staining?.id}/>
	<footer class="br-dialog-inline-section" slot='footer'>
		<button>Delete</button>
		<button class='br-button-primary' type='reset' on:click={() => open = false}>
			Cancel
		</button>
	</footer>
</DialogForm>