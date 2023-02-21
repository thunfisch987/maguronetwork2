<template>
	<VaNavbar>
		<template #left>
			<VaNavbarItem>
				<VaButton icon="va-arrow-right" @click="toggleSidebar(true)" />
			</VaNavbarItem>
			<VaNavbarItem v-if="currentDevice.isMobile" class="logo">
				MAGURONETWORK
			</VaNavbarItem>
		</template>
		<template v-if="!currentDevice.isMobile" #default>
			<VaNavbarItem class="logo"> MAGURONETWORK </VaNavbarItem>
		</template>
	</VaNavbar>
</template>

<script lang="ts" setup>
var toggleSidebar = useToggleSidebar();
var currentDevice = useDevice();
</script>

<style scoped>
.logo {
	font-weight: 600;
	font-size: 1.5rem;
}
</style>
