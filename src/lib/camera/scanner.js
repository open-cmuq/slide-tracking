const adaptOldFormat = (detectedCodes) => {
	if (detectedCodes.length > 0) {
		const [firstCode] = detectedCodes;

		const [
			topLeftCorner,
			topRightCorner,
			bottomRightCorner,
			bottomLeftCorner,
		] = firstCode.cornerPoints;

		return {
			content: firstCode.rawValue,
			location: {
				topLeftCorner,
				topRightCorner,
				bottomRightCorner,
				bottomLeftCorner,
			},
			imageData: null,
		};
	} else {
		return {
			content: null,
			location: null,
			imageData: null,
		};
	}
};

/**
 * Continuously extracts frames from camera stream and tries to read
 * potentially pictured QR codes.
 */
export const keepScanning = (videoElement, options) => {
	// eslint-disable-next-line no-undef
	const barcodeDetector = new BarcodeDetector({ formats: ['qr_code']});

	const { detectHandler, locateHandler, minDelay } = options;

	const processFrame = (state) => async (timeNow) => {
		if (videoElement.readyState > 1) {
			const { lastScanned, contentBefore, locationBefore } = state;

			if (timeNow - lastScanned >= minDelay) {
				const detectedCodes
					= await barcodeDetector.detect(videoElement);
				const { content, location, imageData }
					= adaptOldFormat(detectedCodes);

				if (content !== null && content !== contentBefore) {
					detectHandler({ content, location, imageData });
				}

				if (location !== null || locationBefore !== null) {
					locateHandler(detectedCodes);
				}

				window.requestAnimationFrame(processFrame({
					lastScanned: timeNow,
					contentBefore: content ?? contentBefore,
					locationBefore: location,
				}));
			} else {
				window.requestAnimationFrame(processFrame(state));
			}
		}
	};

	processFrame({
		contentBefore: null,
		locationBefore: null,
		lastScanned: performance.now(),
	})();
};
