<script>
	import '@kwangure/strawberry/default/dropdown/index.css';
	import { Dialog } from '@kwangure/strawberry/default/dialog';
	import { enhance } from '$app/forms';

	/** @type {string} */
	export let action;
	export let errorHeader = 'Task unsuccessful';
	export let method = 'POST';
	/** @type {string | undefined} */
	export let name = undefined;
	/** @type {string | undefined } */
	export let value = undefined;

	/** @type {'modal' | false} */
	let errorDialogOpen = false;
	/** @type {string[]} */
	let formErrors = [];

	/** @type {import('@sveltejs/kit').SubmitFunction} */
	function handleSubmit() {
		return ({ result, update }) => {
			let updateOptions;
			if (result.type === 'failure') {
				errorDialogOpen = 'modal';
				formErrors = result.data?.formErrors || [];
				updateOptions = { reset: false };
			} else {
				errorDialogOpen = false;
				formErrors = [];
			}
			update(updateOptions);
		};
	}
</script>

<form {action} {method} use:enhance={handleSubmit}>
	<button class="br-ignore unbutton br-dropdown-item" {name} {value}>
		<slot></slot>
	</button>
</form>

<Dialog open={errorDialogOpen} --br-dialog-root-max-inline-size="90vw">
	<header class="br-dialog-inline-section">
		<h3>{errorHeader}</h3>
	</header>
	{#if formErrors.length}
		<section class="br-dialog-block-section">
			{#each formErrors as error}
				{error}
			{/each}
		</section>
	{/if}
	<footer class="br-dialog-inline-section">
		<button class='br-button-primary' on:click={() => errorDialogOpen = false}>
			Close
		</button>
	</footer>
</Dialog>

<style>
	form {
		display: contents;
	}
	h3 {
		font-weight: normal;
		line-height: 1;
	}
</style>

