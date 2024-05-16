// @ts-nocheck
import { create } from 'qrcode';

/**
 * @param {string} cmd
 * @param {number} x
 * @param {number | undefined} [y]
 */
function svgCmd(cmd, x, y) {
	let str = cmd + x;
	if (typeof y !== 'undefined') str += ` ${y}`;

	return str;
}

/**
 * Adapted from https://github.com/soldair/node-qrcode/blob/557e0d80f7af1dc05cb44e795c0300ebd24f91bc/lib/renderer/svg-tag.js#L19
 * @param {*} options
 * @returns
 */
export function qrToPath(options) {
	const { data, size, margin = 0 } = options;
	let path = '';
	let moveBy = 0;
	let newRow = false;
	let lineLength = 0;

	for (let i = 0; i < data.length; i++) {
		const col = Math.floor(i % size);
		const row = Math.floor(i / size);

		if (!col && !newRow) newRow = true;

		if (data[i]) {
			lineLength++;

			if (!(i > 0 && col > 0 && data[i - 1])) {
				path += newRow
					? svgCmd('M', col + margin, 0.5 + row + margin)
					: svgCmd('m', moveBy, 0);

				moveBy = 0;
				newRow = false;
			}

			if (!(col + 1 < size && data[i + 1])) {
				path += svgCmd('h', lineLength);
				lineLength = 0;
			}
		} else {
			moveBy++;
		}
	}

	return path;
}

/**
 * @param {URL} url
 * @param {string} slideId
 */
export function createQRCode(url, slideId) {
	const slideUrl = new URL(`${url.protocol}//${url.host}`);
	slideUrl.pathname = `/slide/${slideId}`;
	const qrCode = create(slideUrl.href, { errorCorrectionLevel: 'H' });
	const { data, size } = qrCode.modules;

	return {
		svgSize: size,
		svgPath: qrToPath({
			data: Array.from(data),
			size,
		}),
	};
}
