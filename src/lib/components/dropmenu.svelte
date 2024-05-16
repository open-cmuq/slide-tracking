<script>
    import { Arrow, Dropdown, Popup } from '@kwangure/strawberry/default/dropdown';
    import { mdiDotsHorizontal, mdiDotsVertical, mdiMenuDown } from '@mdi/js';
    import { MdiIcon } from '.';

    /** @type {'dots-horizontal' | 'dots-vertical' | 'menu-down'} */
    export let icon = 'dots-vertical';
</script>

<Dropdown>
    <!-- Specify type=button to allow use in a <form> -->
    <button slot='trigger' type='button'>
        {#if icon === 'dots-horizontal'}
            <MdiIcon d={mdiDotsHorizontal}/>
        {:else if icon === 'dots-vertical'}
            <MdiIcon d={mdiDotsVertical}/>
        {:else if icon === 'menu-down'}
            <MdiIcon d={mdiMenuDown}/>
        {/if}
    </button>
    <Popup>
        <Arrow/>
        <slot/>
    </Popup>
</Dropdown>

<style>
    button[slot=trigger] {
        border: 1px solid transparent;
        background-color: transparent;
        padding-inline: 0;
        width: var(--br-size-6);
        height: var(--br-size-6);
    }
    /* Increase selector specificity */
    button[slot=trigger][type='button']:hover {
        border: 1px solid transparent;
    }
</style>