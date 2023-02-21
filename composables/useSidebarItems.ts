type BaseSideBarItems = {
	readonly title: string;
	readonly icon?: string;
	active?: boolean;
	readonly href?: URL;
	readonly to?: string;
	readonly image?: string;
	readonly images?: Array<string>;
};

export default function () {
	const items = [
		{
			title: "Main",
			icon: "",
			active: false,
			to: "index",
		},
		{
			title: "Akela",
			icon: "twemoji:dog-face",
			active: false,
			to: "Akela",
		},
		{
			title: "EnergyDrinkWiki",
			icon: "pepicons:can",
			active: false,
			to: "EnergyDrinkWiki",
		},
		{
			title: "RandomMemes",
			icon: "",
			image: "/fuckboi.png",
			active: false,
			to: "RandomMemes",
		},
		{
			title: "Vegalou",
			icon: "twemoji:llama",
			active: false,
			to: "Vegalou",
		},
		{
			title: "Nölz' Weebsite",
			icon: "",
			images: true,
			active: false,
			to: "Weebsite",
		},
		{
			title: "Razer4Ever",
			icon: "simple-icons:razer",
			href: new URL("https://oldr4e.littlebitgay.de"),
		},
		{
			title: "Rocketgame",
			icon: "twemoji:rocket",
			href: new URL("https://rg.littlebitgay.de"),
		},
	];
	return useState("sidebarItems", () => items);
}
