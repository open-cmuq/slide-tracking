<script>
	import { Dialog } from '@kwangure/strawberry/default/dialog';
	import { enhance } from '$app/forms';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	/** @type {string} */
	export let action;
	/** @type {string | undefined} */
	export let enctype = undefined;
	/** @type {boolean} */
	export let open;
	/** @type {string} */
	export let header;
	/** @type {'wide' | 'narrow'} */
	export let size = 'wide';

	/** @type {string[]} */
	let formErrors = [];
	const fieldErrors = writable(/** @type {Record<string, string[]>} */({}));
	setContext('field-errors', fieldErrors);

/** @type {import('@sveltejs/kit').SubmitFunction} */
	function handleSubmit() {
		return ({ result, update }) => {
			let updateOptions;
			if (result.type === 'failure') {
				open = true;
				$fieldErrors = result.data?.fieldErrors ?? {};
				formErrors = result.data?.formErrors || [];
				updateOptions = { reset: false };
			} else {
				open = false;
				$fieldErrors = {};
				formErrors = [];
			}
			update(updateOptions);
		};
	}

</script>

<Dialog open={open ? 'modal' : false}
	--br-dialog-root-max-inline-size={size === 'wide' ? '90vw' : ''}>
	<!-- Hide form to prevent flash of invalidated input during exit animation -->
	{#if open}
		<form {action} method="POST" use:enhance={handleSubmit} enctype={enctype}>
			<header class="br-dialog-inline-section">
				<h3>{header}</h3>
			</header>
			{#if formErrors.length}
				<section class="errors br-dialog-block-section">
					{#each formErrors as error}
						{error}
					{/each}
				</section>
			{/if}
			<section class="br-dialog-block-section">
				<slot {fieldErrors}></slot>
			</section>
			<slot name="footer">
				<footer class="br-dialog-inline-section">
					<button class='br-button-primary'>
						Save
					</button>
					<button type='reset' on:click={() => open = false}>
						Cancel
					</button>
				</footer>
			</slot>
		</form>
	{/if}
</Dialog>

<style>
	form {
		display: contents;
		--br-dialog-root-padding-inline: 0;
	}
	section {
		min-width: min(400px, 90vw);
	}
	h3 {
		font-weight: normal;
		line-height: 1;
	}
	.errors {
		background-color: var(--br-dark, hsl(0, 100%, 90%)) var(--br-light, hsl(0, 100%, 95%));
		color: hsl(0, 100%, 50%);
		border-radius: var(--br-global-border-radius);
		margin-inline: var(--br-size-5);
		padding-inline: var(--br-size-4);
		min-width: calc(min(400px, 90vw) - var(--br-size-5) * 2);
	}
</style>