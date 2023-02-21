export default defineNuxtRouteMiddleware((to) => {
	const sidebarItems = useSidebarItems();
	const toggleSidebar = useToggleSidebar();
	sidebarItems.value.forEach(function (item) {
		if (item.to === to.name) {
			item.active = true;
		} else {
			item.active = false;
		}
	});
	toggleSidebar(false);
});
