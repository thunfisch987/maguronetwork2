// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
	modules: [
		'@vuestic/nuxt',
		'@nuxtjs/device',
		'nuxt-icon',
		'nuxt-typed-router',
		'@nuxt/image-edge',
		'@nuxtjs/tailwindcss',
		'@pinia/nuxt',
	],
	css: ['assets/css/main.scss'],
	app: {
		head: {
			meta: [
				{
					name: 'viewport',
					content: 'width=device-width, initial-scale=1',
				},
				{
					charset: 'utf-8',
				},
			],
			link: [],
			style: [],
			script: [],
			noscript: [],
			htmlAttrs: {
				lang: 'en',
			},
			title: 'MaguroNetwork2',
		},
	},
});
