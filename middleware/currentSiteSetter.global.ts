import { useNavbarIconStore } from '~/stores/navbarIcon';

export default defineNuxtRouteMiddleware((to) => {
	const currentSite = useCurrentSite();

	if (to.name) {
		const currentSiteName = useSplitRouterPath(to.name, 'first');
		currentSite.value = currentSiteName;
		useNavbarIconStore().toggleIcon(currentSite.value);
	} else {
		console.error(
			'(custom error :P) Error in Middleware, Route Name (to.name) does not exist',
		);
	}
});
