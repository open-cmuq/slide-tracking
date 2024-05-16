export class InsecureContextError extends Error {
	constructor() {
		super(
			'camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.',
		);

		this.name = 'InsecureContextError';
	}
}

export class StreamApiNotSupportedError extends Error {
	constructor() {
		super('this browser has no Stream API support');

		this.name = 'StreamApiNotSupportedError';
	}
}
