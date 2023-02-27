export default defineNuxtRouteMiddleware((to) => {
	const sidebarItems = useSidebarItems();
	const toggleSidebar = useToggleSidebar();
	const currentSidebarItem = useCurrentSidebarItem();
	for (const [itemname, item] of Object.entries(sidebarItems)) {
		if (item.to === to.name) {
			item.active = true;
			currentSidebarItem.value = itemname;
		} else {
			item.active = false;
		}
	}
	toggleSidebar(false);
});
