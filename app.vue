<template>
	<NuxtLoadingIndicator :throttle="0" />
	<MaguroSidebar />
	<MaguroNavbar />
	<NuxtPage />
	<div
		class="sidebar-mask"
		:class="{ 'sidebar-open': sidebarEnabled }"
		@click="useToggleSidebar(!sidebarEnabled)"
	/>
	<i>{{ useRoute().name }}</i>
	<b>{{ useRoute().meta.parentName }}</b>
</template>

<script lang="ts" setup>
const sidebarEnabled = useSidebarEnable();
</script>
:

<style lang="scss">
.sidebar-mask {
	z-index: 2;
	position: fixed;
	width: 100vw;
	height: 100vh;
	display: none;

	&.sidebar-open {
		display: block;
	}
}
</style>
