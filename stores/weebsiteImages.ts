import { defineStore } from 'pinia';

export const useWeebsiteImagesStore = defineStore('weebsiteImages', {
	state: () => {
		return {
			allImages: [
				'/evangelion/asuka_smug.png',
				'/evangelion/cupoftea.PNG',
				'/evangelion/misato_smug.png',
				'/evangelion/misato_toast.PNG',
			],
			index: 0,
		};
	},
	getters: {
		currentImage: (state) => state.allImages[state.index],
	},
	actions: {
		next() {
			if (this.index === this.allImages.length - 1) {
				this.index = -1;
				return this.allImages[++this.index];
			}
			return this.allImages[this.index++];
		},
	},
});
