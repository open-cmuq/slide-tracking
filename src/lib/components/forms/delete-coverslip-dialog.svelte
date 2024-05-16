<script>
	import { DialogForm } from '$lib/components';

	export let open = false;
	/** @type {import('@prisma/client').Coverslip | undefined} */
	export let coverslip;
</script>

<DialogForm header='Delete coverslip?' bind:open action='/coverslip/{coverslip?.id}?/delete' size='narrow'>
	This will delete all nested coverslip stainings and files, and cannot be undone.
	<input type='hidden' name='id' value={coverslip?.id}/>
	<footer class="br-dialog-inline-section" slot='footer'>
		<button>Delete</button>
		<button class='br-button-primary' type='reset' on:click={() => open = false}>
			Cancel
		</button>
	</footer>
</DialogForm>