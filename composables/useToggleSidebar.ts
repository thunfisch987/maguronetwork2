import { useWeebsiteImagesStore } from '@/stores/weebsiteImages';


export default function () {
	const weebsiteImagesStore = useWeebsiteImagesStore()
	const sidebarEnabled = useSidebarEnable();
	return (to?: boolean) => {
		sidebarEnabled.value =
			typeof to === 'boolean' ? to : !sidebarEnabled.value;
		if (to === true) {
			weebsiteImagesStore.next();
		}
	};
}
