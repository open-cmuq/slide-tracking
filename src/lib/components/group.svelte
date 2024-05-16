<script>
	import { createEventDispatcher, getContext, onDestroy, setContext } from 'svelte';
	import uid from 'uid';
	import { writable } from 'svelte/store';

	/** @type {string} */
	export let label;
	/** @type {string} */
	export let name;
	/** @type {boolean} */
	export let required = false;

	const groupId = uid();
	const hintId = uid();
	const nameStore = writable(name);
	$: $nameStore = name;

	const dispatch = createEventDispatcher();

	setContext('group-hint-id', hintId);
	setContext('group-name', nameStore);

	/** @type {import('svelte/store').Writable<Record<string, string[]>>} */
	const fieldErrors = getContext('field-errors');

	let latestError = '';
	onDestroy(fieldErrors.subscribe((errors) => {
		latestError = errors[name]?.[0] || '';
	}));

	/**
	 * @param {Event & {
	 *     currentTarget: EventTarget & HTMLInputElement
	 * }} event
	 */
	function getValidationMessage(event) {
		latestError = event.currentTarget.validationMessage;
	}
	/**
	 * @param {Event & {
	 *     currentTarget: EventTarget & HTMLElement,
	 * }} event
	 */
	function updateValue(event) {
		const target = /** @type {HTMLElement} */(event.target);
		if (target?.nodeName === 'INPUT') {
			const inputElement = /** @type {HTMLInputElement} */(target);
			dispatch('change', inputElement.value);
		}
	}
</script>

<div class="group" role="radiogroup" on:validate={getValidationMessage}
	aria-labelledby={groupId}>
	<div id={groupId}>{label}</div>
	<div class="inputs" on:change={updateValue}>
		<slot/>
	</div>
	<div id={hintId} class="hint-wrapper">
		{#if latestError}
			<div class="error">{latestError}</div>
		{:else}
			<div class="required">
				This field is {required ? 'required' : 'optional'}
			</div>
		{/if}
	</div>
</div>

<style>
	.group {
		display: flex;
		flex-direction: column;
	}
	.error {
		color: hsl(0, 100%, 50%);
		padding-block: var(--br-size-2);
	}
	.required {
		color: var(--br-dark, hsl(225deg, 100%, 70%)) var(--br-light, hsl(225deg, 100%, 55%));
	}
	.hint-wrapper:empty {
		display: none;
	}
	.required {
		max-height: 0;
		opacity: 0;
		overflow: hidden;
		transition: opacity .25s ease, max-height .5s ease-in;
	}
	:global(.br-container:has(:placeholder-shown:focus)) + .hint-wrapper > .required,
	:global(.br-container:has(select:invalid:focus)) + .hint-wrapper > .required  {
		/* Just a bit higher than the height of `.required` */
		max-height: 40px;
		opacity: 1;
		padding-block: var(--br-size-2);
	}
</style>
