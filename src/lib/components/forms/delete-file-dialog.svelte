<script>
	import { DialogForm } from '$lib/components';

	export let open = false;
	/** @type {import('@prisma/client').CoverslipFile | undefined} */
	export let file;
</script>

<DialogForm header='Delete file?' bind:open action='/coverslip/{file?.coverslipId}/files?/delete' size='narrow'>
	This action cannot be undone.
	<input type='hidden' name='id' value={file?.id}/>
	<footer class="br-dialog-inline-section" slot='footer'>
		<button>Delete</button>
		<button class='br-button-primary' type='reset' on:click={() => open = false}>
			Cancel
		</button>
	</footer>
</DialogForm>