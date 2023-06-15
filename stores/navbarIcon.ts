import { defineStore } from 'pinia';
import { useWeebsiteImagesStore } from './weebsiteImages';

export type navbarIconType = {
	currentSite: string;
	name: string;
};

export const useNavbarIconStore = defineStore('currentNavbarIcon', () => {
	const src = computed(() => {
		switch (useCurrentSite().value) {
			case 'RandomMemes':
				return 'fuckboi.png';
				break;
			case 'Weebsite':
				return useWeebsiteImagesStore().currentImage;
			default:
				return '';
		}
	});

	const iconName = computed(() => {
		switch (useCurrentSite().value) {
			case 'index':
				return '';

			case 'Akela':
				return 'twemoji:dog-face';

			case 'EnergyDrinkWiki':
				return 'pepicons:can';

			case 'Vegalou':
				return 'twemoji:llama';

			default:
				return '';
		}
	});
	return { src, iconName };
});
