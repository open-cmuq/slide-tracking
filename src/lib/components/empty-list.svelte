<script>
    import { MdiIcon } from '.';
    import { mdiMicroscope } from '@mdi/js';
</script>

<div class="center empty">
    <div class="center content">
        <MdiIcon d={mdiMicroscope}></MdiIcon>
        <slot></slot>
    </div>
</div>

<style>
    .center {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
    }
	.empty {
        flex: 1;
	}
    .content {
        --icon-size: var(--br-size-11);
        font-size: var(--br-size-5);
        color: var(--br-dark, #b0b0b0) var(--br-light, #888);
        flex: none;
        max-width: 30ch;
    }
</style>