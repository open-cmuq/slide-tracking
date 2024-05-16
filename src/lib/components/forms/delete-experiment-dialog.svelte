<script>
	import { DialogForm } from '$lib/components';

	export let open = false;
	/** @type {import('@prisma/client').Experiment | undefined} */
	export let experiment;
</script>

<DialogForm header="Delete '{experiment?.title}'?" bind:open action='/experiments?/delete' size='narrow'>
	This will delete all nested slides and coverslips, and cannot be undone.
	<input type='hidden' name='id' value={experiment?.id}/>
	<footer class="br-dialog-inline-section" slot='footer'>
		<button>Delete</button>
		<button class='br-button-primary' type='reset' on:click={() => open = false}>
			Cancel
		</button>
	</footer>
</DialogForm>