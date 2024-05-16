<script>
	import { getContext, onDestroy } from 'svelte';
	import { Container } from '@kwangure/strawberry/default/input/container';
	import { createEventForwarder } from '@kwangure/strawberry/utils/events';
	import { mdiAsterisk } from '@mdi/js';
	import { MdiIcon } from '..';
	import { validate } from '@kwangure/strawberry/actions/validate';

	/** @type {string | undefined} */
	export let form = undefined;
	/** @type {string} */
	export let label;
	/** @type {string} */
	export let name;
	/** @type {string} */
	export let placeholder = '';
	/** @type {boolean} */
	export let required = false;

	const forward = createEventForwarder();
	/** @type {import('svelte/store').Writable<Record<string, string[]>>} */
	const fieldErrors = getContext('field-errors');

	let latestError = '';
	onDestroy(fieldErrors.subscribe((errors) => {
		latestError = errors[name]?.[0] || '';
	}));

	/**
	 * @param {CustomEvent<{ validationMessage: string }>} event
	 */
	function getValidationMessage(event) {
		latestError = event.detail.validationMessage;
	}
</script>

<Container let:inputId let:hintId on:validate={getValidationMessage}>
	<label slot='label' for={inputId}>
		{label}
		<span class="required">
			<MdiIcon d={mdiAsterisk}/>
		</span>
	</label>
	<select id={inputId} aria-describedby={hintId} {form} {name} {required} {placeholder}
		use:forward use:validate>
		{#if placeholder}
			<option value="" disabled selected>{placeholder}</option>
		{/if}
		<slot/>
	</select>
	<div id={hintId} slot='hint'>
		{#if latestError}
			<div class="error">{latestError}</div>
		{/if}
	</div>
</Container>

<style>
	label {
		display: grid;
		grid-template-columns: 1fr max-content;
		align-items: center;
	}
	.error {
		color: hsl(0, 100%, 50%);
		padding-block: var(--br-size-2);
	}
	.required {
		color: hsl(0, 100%, 50%);
		--icon-size: var(--br-size-4);
	}
	div[slot=hint]:empty {
		display: none;
	}
</style>
