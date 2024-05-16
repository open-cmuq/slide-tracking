<script>
    import { DropMenu } from '.';

    export let level = '3';
    /** @type {string} */
    export let header;
    /** @type {string} */
    export let header_hint = '';
</script>

<div class="wrapper">
    <div class="header">
        {#if level === '3'}
            <h3 title={header_hint}>{header}</h3>
        {:else if level === '4'}
            <h4 title={header_hint}>{header}</h4>
        {/if}
        {#if $$slots['drop-menu']}
            <DropMenu>
                <slot name="drop-menu"/>
            </DropMenu>
        {/if}
    </div>
    <slot></slot>
</div>

<style>
    .wrapper {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-bottom: 10px;
    }
    .header {
        display: flex;
    }
    .header > :global(button) {
        margin-left: auto;
    }
    h3,
    h4 {
        font-weight: normal;
        margin: 0;
        display: flex;
        align-items: flex-end;
        cursor: default;
        flex: 1;
    }
</style>