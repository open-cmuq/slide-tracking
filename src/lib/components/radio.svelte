<script>
	import { createEventForwarder } from '@kwangure/strawberry/utils/events';
	import { getContext } from 'svelte';
	import { validate } from '@kwangure/strawberry/actions/validate';

	/** @type {string | undefined} */
	export let form = undefined;
	export let checked = false;
	/** @type {string} */
	export let label;
	/** @type {boolean} */
	export let required = false;
	/** @type {string} */
	export let value;

	const forward = createEventForwarder();
	const hintId = getContext('group-hint-id') || '';
	const name = getContext('group-name');
</script>

<label>
	<input aria-describedby={hintId} {checked} {form} name={$name}
		{required} {value} use:forward use:validate type='radio'/>
	{label}
</label>

