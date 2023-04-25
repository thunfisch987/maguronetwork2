<template>
	<VaNavbar>
		<template #left>
			<VaNavbarItem>
				<VaButton icon="va-arrow-right" @click="toggleSidebar(true)" />
			</VaNavbarItem>
			<VaNavbarItem v-if="currentDevice.isMobile" class="logo">
				{{ currentSidebarItem.itemname.toUpperCase() }}
			</VaNavbarItem>
		</template>
		<template v-if="!currentDevice.isMobile" #default>
			<VaNavbarItem class="logo">
				{{ currentSidebarItem.itemname.toUpperCase() }}
			</VaNavbarItem>
		</template>
	</VaNavbar>
</template>

<script lang="ts" setup>
const toggleSidebar = useToggleSidebar();
const currentDevice = useDevice();
const currentSidebarItem = useCurrentSidebarItem();
</script>

<style scoped>
.logo {
	font-weight: 600;
	font-size: 1.5rem;
}
</style>
