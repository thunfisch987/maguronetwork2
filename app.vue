<template>
	<!-- <NuxtLoadingIndicator :throttle="0" /> -->
	<MaguroNavbar />
	<MaguroSidebar />
	<div
		class="sidebar-mask"
		:class="{ 'sidebar-open': sidebarEnabled }"
		@click="toggleSidebar(false)"
	/>
	<NuxtPage />
	<span>yeet</span>
</template>

<script lang="ts" setup>
const sidebarEnabled = useSidebarEnable();
const toggleSidebar = useToggleSidebar();
</script>

<style>
.sidebar-mask {
	z-index: 2;
	position: fixed;
	width: 100vw;
	height: 100vh;
	display: none;
}

.sidebar-mask.sidebar-open {
	display: block;
}
</style>
