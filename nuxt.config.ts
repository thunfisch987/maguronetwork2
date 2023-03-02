// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
	modules: [
		"@vuestic/nuxt",
		"@nuxtjs/device",
		"nuxt-icon",
		"nuxt-typed-router",
		"@nuxt/devtools",
		"@nuxt/image-edge",
	],
	vuestic: {
		config: {
			colors: {
				currentPresetName: "dark",
			},
		},
	},
	css: ["assets/css/main.scss"],
	app: {
		head: {
			meta: [
				{
					name: "viewport",
					content: "width=device-width, initial-scale=1",
				},
				{
					charset: "utf-8",
				},
			],
			link: [],
			style: [],
			script: [],
			noscript: [],
			// title: "MaguroNetwork",
			htmlAttrs: {
				lang: "en",
				style: "min-height: 100vh; min-width: 100vw",
			},
			title: "MaguroNetwork2",
		},
	},
	typescript: {
		shim: true,
	},
});
