module.exports = {
	root: true,
	env: {
		es2021: true,
		node: true,
	},
	extends: ['eslint:recommended', '@nuxt/eslint-config', 'prettier'],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	rules: {},
};
