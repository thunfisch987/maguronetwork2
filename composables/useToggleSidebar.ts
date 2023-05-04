import { useWeebsiteImagesStore } from '@/stores/weebsiteImages';

export default function (toggle: boolean) {
	useSidebarEnable().value = toggle;
	if (toggle === true) {
		useWeebsiteImagesStore().next();
	}
}
