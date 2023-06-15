export default defineNuxtRouteMiddleware(async (to) => {
	const currentSite = useCurrentSite();

	if (to.name) {
		const currentSiteName = useSplitRouterPath(to.name, 'first');
		currentSite.value = currentSiteName;
	} else {
		console.error(
			'(custom error :P) Error in Middleware, Route Name (to.name) does not exist',
		);
	}
});
