module.exports = {
	root: true,
	extends: [
		'@kwangure/eslint-config-svelte',
	],
	rules: {
		'import/no-unresolved': ['error', { ignore: [
			// CJS fighting ES6 exports field
			'@sveltejs/kit',
			'@auth/sveltekit',
		]}],
		// ESLint CJS fighting Svelte's ES6 exports field
		'import/export': 'off',
		'import/namespace': 'off',
		'import/named': 'off',
	},
};
