import { defineStore } from 'pinia';
import { useWeebsiteImagesStore } from './weebsiteImages';

export type navbarIconType = {
	currentSite: string;
	name: string;
	src: string;
};

export const useNavbarIconStore = defineStore('currentNavbarIcon', {
	state: (): navbarIconType => ({
		currentSite: '',
		name: '',
		src: '',
	}),
	actions: {
		toggleIcon(currentSiteInput: string) {
			this.currentSite = currentSiteInput;
			switch (currentSiteInput) {
				case 'index':
					this.name = '';
					break;

				case 'Akela':
					this.name = 'twemoji:dog-face';
					break;

				case 'EnergyDrinkWiki':
					this.name = 'pepicons:can';
					break;

				case 'RandomMemes':
					this.src = 'fuckboi.png';
					break;

				case 'Vegalou':
					this.name = 'twemoji:llama';
					break;

				case 'Weebsite':
					this.src = useWeebsiteImagesStore().current;
					break;

				default:
					console.error('useNavbarIconToggle switch case error');
			}
		},
	},
});
