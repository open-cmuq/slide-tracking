<script>
	import { createEventForwarder } from '@kwangure/strawberry/utils/events';

	/** @type {string | null} */
	export let disabledHint = null;

	const forward = createEventForwarder();
</script>

<button use:forward class="br-ignore unbutton br-list-item"
	disabled={Boolean(disabledHint)}
	title={disabledHint}>
	<slot/>
</button>

<style>
	button[disabled] {
		opacity: 0.7;
		cursor: not-allowed;
	}
</style>