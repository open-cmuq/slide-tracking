<script>
	import { DialogForm } from '$lib/components';

	export let open = false;
	/** @type {import('@prisma/client').Project | undefined} */
	export let project;
</script>

<DialogForm header="Delete '{project?.title}'?" bind:open action='/projects?/delete' size='narrow'>
	This will delete all nested experiments and slides, and cannot be undone.
	<input type='hidden' name='id' value={project?.id}/>
	<footer class="br-dialog-inline-section" slot='footer'>
		<button>Delete</button>
		<button class='br-button-primary' type='reset' on:click={() => open = false}>
			Cancel
		</button>
	</footer>
</DialogForm>