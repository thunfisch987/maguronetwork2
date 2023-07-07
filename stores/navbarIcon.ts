import { defineStore } from 'pinia';
import { useWeebsiteImagesStore } from './weebsiteImages';

export type navbarIconType = {
	currentSite: string;
	name: string;
};

export const useNavbarIconStore = defineStore('currentNavbarIcon', () => {
	const src = computed(() => {
		switch (useRoute().meta.parentName) {
			case 'RandomMemes':
				return 'fuckboi.png';
			case 'Weebsite':
				return useWeebsiteImagesStore().currentImage;
			default:
				return '';
		}
	});

	const iconName = computed(() => {
		switch (useRoute().meta.parentName) {
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
