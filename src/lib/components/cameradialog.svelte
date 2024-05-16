<script>
    import QrScanner from '$lib/components/qrcode.svelte';
    import { goto } from '$app/navigation';

    export let show = false;
    export let close;
    let nonSlideQRCode = false;


    function track(detectedCodes, ctx) {
    	for (const detectedCode of detectedCodes) {
    		const [firstPoint, ...otherPoints] = detectedCode.cornerPoints;

    		ctx.strokeStyle = 'red';

    		ctx.beginPath();
    		ctx.moveTo(firstPoint.x, firstPoint.y);
    		for (const { x, y } of otherPoints) {
    			ctx.lineTo(x, y);
    		}
    		ctx.lineTo(firstPoint.x, firstPoint.y);
    		ctx.closePath();
    		ctx.stroke();
    	}
    }

    // TODO: This doesn't work. Legacy reminants. Follow links directly
    function handleDetect(event) {
    	const { detail: qrContent } = event;
    
    	// const match = qrContent.match(/^slide-([A-z0-9\-_]+)/);
    	const parts = qrContent.split('/');
    
    	if (parts[parts.length-2]=='slide') {
    		const id = parts[parts.length - 1];
    		goto(`/slide/${id}`);
    		show = false;
    	}
    	nonSlideQRCode = !(parts[parts.length-2]=='slide');
    }
</script>


{#if show}
<div class="dialog-overlay" >
    <div class="dialog">
        <QrScanner on:detect={handleDetect} {track}/>
        {#if nonSlideQRCode}
            <div class="invalid">
                Detected QR Code is not a valid slide.
            </div>
        {/if}
        <button on:click={close} style="margin: 5px 45%;">Close</button>
    </div>
</div>
{/if}
<style>
.dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;

}

.dialog {
    background: white;
    padding: 20px;
    border-radius: 8px;
    z-index: 100;
}
</style>