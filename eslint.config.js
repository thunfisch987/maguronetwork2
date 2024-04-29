import withNuxt from './.nuxt/eslint.config.mjs';

/**@type {import('@nuxt/eslint-config/flat').FlatConfig[]} */
export default withNuxt({
	rules: {
		'vue/html-indent': 'off',
		'@typescript-eslint/no-unused-vars': [
			'warn',
			{ varsIgnorePattern: '^_|_' },
		],
	},
});
