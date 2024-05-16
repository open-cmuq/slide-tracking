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

<div class="slide">
	<div class="slide-surface">
		<slot></slot>
	</div>
	<div class="slide-label">
        {#if slideId}
            <svg id="id{slideId}" viewBox="0 0 {svgSize} {svgSize}"
                class="print">
                <path d={svgPath}/>
            </svg>
        {/if}
    </div>
</div>

<style>
	.slide {
		width: var(--st-slide-width);
		aspect-ratio: 1/3;
        display: grid;
        grid-template-rows: 3fr 1fr;
		box-shadow: var(--st-box-shadow);
		background-color:
			var(--br-dark, rgba(255,255,255, 0.1))
			var(--br-light, rgba(0, 0, 0, 0.05));
	}
	.slide-surface {
        position: relative;
    }
	.slide-label {
        border-top: var(--st-border);
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