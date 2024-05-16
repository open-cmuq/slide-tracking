import fs from 'fs';
import path from 'path';

/** @param {string} dir */
export function mkdirp(dir) {
	try {
		fs.mkdirSync(dir, { recursive: true });
	} catch (/** @type {any} */ err) {
		if (err.code === 'EEXIST') return;
		throw err;
	}
}

/**
 * @param {string} filepath
 * @param {string | Buffer | NodeJS.ArrayBufferView} data
 */
export function write(filepath, data) {
	mkdirp(path.dirname(filepath));

	fs.writeFileSync(filepath, data);
}
