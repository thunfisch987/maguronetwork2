export default defineNuxtRouteMiddleware((to) => {
	const toggleSidebar = useToggleSidebar()
	useCurrentSidebarItem(to)
	toggleSidebar(false)
})
