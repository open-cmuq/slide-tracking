<script>
	import { getContext, onDestroy } from 'svelte';
	import { autosize } from '@kwangure/strawberry/actions/autosize';
	import { Container } from '@kwangure/strawberry/default/input/container';
	import { createEventForwarder } from '@kwangure/strawberry/utils/events';
	import { validate } from '@kwangure/strawberry/actions/validate';

	/** @type {string | undefined} */
	export let form = undefined;
	/** @type {string} */
	export let label;
	/** @type {number | string | undefined} */
	export let max = undefined;
	/** @type {number | string | undefined} */
	export let min = undefined;
	/** @type {string} */
	export let name;
	/** @type {string} */
	export let placeholder = '';
	/** @type {boolean} */
	export let required = false;
	/** @type {'date' | 'number' | 'text' | 'textarea'} */
	export let type = 'text';
	/** @type {string | number} */
	export let value = '';

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
	</label>
	{#if type === 'text'}
		<input id={inputId} aria-describedby={hintId} {form} {name}
			{placeholder} {required} {value} use:forward use:validate/>
	{:else if type === 'textarea'}
		<textarea id={inputId} aria-describedby={hintId} {form} {name}
			{placeholder} {required} {value} rows="1"
			use:autosize={{ minrows: 2 }} use:forward use:validate/>
	{:else if type === 'number'}
		<input id={inputId} aria-describedby={hintId} {form} {name}
			{placeholder} {required} {value} type='number'
			use:forward use:validate/>
	{:else if type === 'date'}
		<input id={inputId} aria-describedby={hintId} {form} {max} {min} {name}
			{placeholder} {required} {value}  type='date'
			use:forward use:validate/>
	{/if}
	<div id={hintId} slot='hint'>
		{#if latestError}
			<div class="error">{latestError}</div>
		{:else}
			<div class="required">
				This field is {required ? 'required' : 'optional'}
			</div>
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
		color: var(--br-dark, hsl(225deg, 100%, 70%)) var(--br-light, hsl(225deg, 100%, 55%));
	}
	div[slot=hint]:empty {
		display: none;
	}
	.required {
		max-height: 0;
		opacity: 0;
		overflow: hidden;
		transition: opacity .25s ease, max-height .5s ease-in;
	}
	:global(.br-container:has(:placeholder-shown:focus)) + div[slot=hint] > .required,
	:global(.br-container:has(select:invalid:focus)) + div[slot=hint] > .required  {
		/* Just a bit higher than the height of `.required` */
		max-height: 40px;
		opacity: 1;
		padding-block: var(--br-size-2);
	}
</style>
