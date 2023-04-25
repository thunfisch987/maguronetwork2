export default function () {
	const sidebarEnabled = useSidebarEnable();
	const toggleWeebsiteImage = useToggleWeebsiteImage();
	return (to?: boolean) => {
		sidebarEnabled.value =
			typeof to === 'boolean' ? to : !sidebarEnabled.value;
		if (to === true) {
			toggleWeebsiteImage();
		}
	};
}
