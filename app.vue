<template>
	<div>
		<NuxtLoadingIndicator :throttle="0" />
		<MaguroNavbar />
		<MaguroSidebar />
		<div
			class="sidebar-mask"
			:class="{ 'sidebar-open': sidebarEnabled }"
			@click="useToggleSidebar(false)"
		/>
		<NuxtPage />
	</div>
</template>

<script lang="ts" setup>
// const sidebarEnabled = useSidebarEnable();
</script>

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
