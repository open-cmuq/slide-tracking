<script>
    import { createEventDispatcher, onDestroy } from 'svelte';
    import { browser } from '$app/environment';
    import Camera from '$lib/camera/index.js';
    import { keepScanning } from '$lib/camera/scanner.js';

    const dispatch = createEventDispatcher();
    function onDetect(result) {
    	const { content } = result;

    	dispatch('detect', content);
    }

    /**
     * @type {"auto" | "rear" | "front" | "off"}
     */
    export let camera = 'auto';

    export let track = undefined;

    let cameraInstance = null;
    let destroyed = false;
    let trackingLayer;
    let pauseFrame;
    let video;

    $: shouldScan = cameraInstance !== null;
    $: if (cameraInstance !== null) startScanning();

    function resetCamera() {
    	if (cameraInstance !== null) {
    		cameraInstance.stop();
    		cameraInstance = null;
    	}
    }

    function setupVideo(video) {
    	if (!browser) return;

    	if (!('BarcodeDetector' in window)) {

		import('barcode-detector')
			.then((module) => {
				window.BarcodeDetector = module.default;
			});
    	}

    	if (camera === 'off') {
    		cameraInstance = null;
    	} else {
    		try {
    			Camera(video, { camera })
    				.then((instance) => {
    					cameraInstance = instance;
    					// if the component is destroyed before `cameraInstance` resolves a
    					// `onDestroy` hook has no chance to clear the remaining camera
    					// stream.
    					if (destroyed) {
    						cameraInstance.stop();
    					}
    				});
    		} catch (error) {
    			console.error({ error });
    		}
    	}
    }

    function startScanning() {
    	clearCanvas(pauseFrame);
    	clearCanvas(trackingLayer);
    	keepScanning(video, {
    		detectHandler: onDetect,
    		locateHandler: onLocate,
    		minDelay: 500,
    	});
    }

    function onLocate(detectedCodes) {
    	const canvas = trackingLayer;
    	if (canvas !== undefined) {
    		if (detectedCodes.length > 0 && track && video) {
    			// The visually occupied area of the video element.
    			// Because the component is responsive and fills the available space,
    			// this can be more or less than the actual resolution of the camera.
    			const displayWidth = video.offsetWidth;
    			const displayHeight = video.offsetHeight;
    			// The actual resolution of the camera.
    			// These values are fixed no matter the screen size.
    			const resolutionWidth = video.videoWidth;
    			const resolutionHeight = video.videoHeight;
    			// Dimensions of the video element as if there would be no
    			//   object-fit: cover;
    			// Thus, the ratio is the same as the cameras resolution but it's
    			// scaled down to the size of the visually occupied area.
    			const largerRatio = Math.max(
    				displayWidth / resolutionWidth,
    				displayHeight / resolutionHeight,
    			);
    			const uncutWidth = resolutionWidth * largerRatio;
    			const uncutHeight = resolutionHeight * largerRatio;
    			const xScalar = uncutWidth / resolutionWidth;
    			const yScalar = uncutHeight / resolutionHeight;
    			const xOffset = (displayWidth - uncutWidth) / 2;
    			const yOffset = (displayHeight - uncutHeight) / 2;
    			const scale = ({ x, y }) => ({
    				x: Math.floor(x * xScalar),
    				y: Math.floor(y * yScalar),
    			});
    			const translate = ({ x, y }) => ({
    				x: Math.floor(x + xOffset),
    				y: Math.floor(y + yOffset),
    			});
    			const adjustedCodes = detectedCodes.map((detectedCode) => {
    				const { boundingBox, cornerPoints } = detectedCode;
    				const { x, y } = translate(scale({
    					x: boundingBox.x,
    					y: boundingBox.y,
    				}));
    				const { x: width, y: height } = scale({
    					x: boundingBox.width,
    					y: boundingBox.height,
    				});
    				return {
    					...detectedCode,
    					cornerPoints: cornerPoints
						.map((point) => translate(scale(point))),
    					boundingBox: DOMRectReadOnly
						.fromRect({ x, y, width, height }),
    				};
    			});
    			canvas.width = video.offsetWidth;
    			canvas.height = video.offsetHeight;
    			const ctx = canvas.getContext('2d');
    			track(adjustedCodes, ctx);
    		} else {
    			clearCanvas(canvas);
    		}
    	}
    }

    function clearCanvas(canvas) {
    	const ctx = canvas.getContext('2d');
    	ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    onDestroy(() => {
    	resetCamera();
    	destroyed = true;
    });
</script>

<div class="qrcode-stream-wrapper" class:qrcode-stream-camera--hidden={!shouldScan}>
    <video bind:this={video} class="qrcode-stream-camera"
        autoplay muted playsinline use:setupVideo>
    </video>

    {#if !shouldScan}
        <canvas bind:this={pauseFrame} class="qrcode-stream-camera"></canvas>
    {/if}

    <canvas bind:this={trackingLayer} class="qrcode-stream-overlay"></canvas>

    <div class="qrcode-stream-overlay">
        <slot></slot>
    </div>
</div>

<style lang="css" scoped>
    .qrcode-stream-wrapper {
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 0;
    }
    .qrcode-stream-wrapper.qrcode-stream-camera--hidden {
        /* maintain an aspect ratio of 16:9 */
        padding-bottom: 56.25%;
    }
    .qrcode-stream-overlay {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }
    .qrcode-stream-camera {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
    }
    /* When a camera stream is loaded, we assign the stream to the `video`
    * element via `video.srcObject`. At this point the element used to be
    * hidden with `display: none`. We do that because
    * at this point the videos dimensions are not known yet. We have to
    * wait for the `loadeddata` event first. Only after that event we
    * display the video element. Otherwise the elements size awkwardly flickers.
    *
    * However, it appears in iOS 15 all iOS browsers won't properly render
    * the video element if the `video.srcObject` was assigned *while* the
    * element was hidden with `display: none`. Using `visibility: hidden`
    * instead seems to have fixed the problem though.
    */
    .qrcode-stream-camera--hidden video {
        visibility: hidden;
        position: absolute;
    }
    video {
        display: block;
    }
</style>