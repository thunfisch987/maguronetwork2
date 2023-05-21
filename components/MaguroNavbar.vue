<template>
	<VaNavbar>
		<template #left>
			<VaNavbarItem>
				<VaButton
					icon="va-arrow-right"
					@click="useToggleSidebar(true)"
				/>
			</VaNavbarItem>
			<VaNavbarItem v-if="currentDevice.isMobile" class="logo mainlogo">
				MaguroNetwork
			</VaNavbarItem>
		</template>
		<template v-if="!currentDevice.isMobile" #default>
			<VaNavbarItem class="logo mainlogo"> MaguroNetwork </VaNavbarItem>
		</template>
	</VaNavbar>
</template>

<script lang="ts" setup>
const currentDevice = useDevice();
</script>
