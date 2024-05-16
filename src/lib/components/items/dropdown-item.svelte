<script>
	import { Arrow, Dropdown, Popup } from '@kwangure/strawberry/default/dropdown';
	import { MdiIcon } from '..';
	import { mdiMenuDown } from '@mdi/js';

	/** @type {string} */
	export let title;
</script>

<Dropdown>
	<button slot='trigger'  class="br-ignore br-list-item">
		{title}
		<MdiIcon d={mdiMenuDown}/>
	</button>
	<Popup>
		<Arrow/>
		<slot/>
	</Popup>
</Dropdown>

<style>
	button {
		font-size: var(--br-size-4);
		padding-inline: var(--br-size-3);
	}
	button,
	button:hover {
		color: inherit;
        border: 1px solid transparent;
    }
	button:not(:hover) {
        background-color: transparent;
    }
</style>