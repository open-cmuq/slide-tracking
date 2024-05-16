<script>
	import { createQRCode } from '$lib/qrcode';
	import { page } from '$app/stores';

	/** @type {string} */
	export let slideId = '';

	/** @type {string} */
	let svgPath;
	/** @type {number} */
	let svgSize;

	$: updateQrCode(slideId);

	/**
     * @param {string} slideId
     */
	function updateQrCode(slideId) {
		if (!slideId) return;
		({ svgPath, svgSize } = createQRCode($page.url, slideId));
	}
</script>

<div class="plate">
    <div class = "plate-top">
        <div class="row-labels">
            {#each Array(9) as _, i}
                {#if (i == 0)}
                    <div class="label ">{' '}</div>
                {:else}
                    <div class="label">{String.fromCharCode(65 + i-1)}</div>
                {/if}
            {/each}
        </div>
        <div class="plate-content">
            <div class="col-labels">
                {#each Array(12) as _, i}
                    <div class="label">{i+1}</div>
                {/each}
            </div>
            <div class="plate-surface">
                <slot></slot>
            </div>
            
        </div>
    </div>
    <div class="plate-label">
        {#if slideId}
            <svg id="id{slideId}" viewBox="0 0 {svgSize} {svgSize}"
                class="print">
                <path d={svgPath}/>
            </svg>
        {/if}
    </div>
	
</div>

<style>

	.plate {
        width: var(--st-plate-width);
        aspect-ratio: 1.2;
	}
    .plate-top {
        display: grid;
        grid-template-columns: auto 1fr;
        grid-template-rows: auto 1fr;
        gap: 4px;
        background-color:
			var(--br-dark, rgba(255,255,255, 0.1))
			var(--br-light, rgba(0, 0, 0, 0.05));
    }

    .row-labels {
        display: grid;
        grid-template-rows: repeat(9, 1fr);
        align-items: center;
        justify-content: right;
        text-align: right;
        padding: 10px 1px;
    }

    .col-labels {
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        justify-content: start;
        align-items: center;
        padding: 0px 10px;
    }
    .plate-content {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto 1fr;
        align-items: start;
        width: 100%;
    }
    .label {
        font-weight: bold;
        padding: 0.2rem 0.5rem;
    }
	.plate-surface {
        display: grid;
    }
	.plate-label {
        border-top: var(--st-border);
        width: 100%;
        height: 24%;
        min-height: 0;
        display: grid;
        align-items: center;
        justify-content: center;
        background-color: rgba(255, 255, 255, 0.75);
    }
    svg {
        height: 80%;
        aspect-ratio: 1;
        opacity: 0.75;
    }
    path {
        stroke: #000;
    }
</style>