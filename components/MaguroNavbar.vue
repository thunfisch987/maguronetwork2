<template>
	<VaNavbar class="navbarroot">
		<template #left>
			<VaNavbarItem>
				<VaButton
					icon="va-arrow-right"
					@click="useToggleSidebar(!sidebarEnable)"
				/>
			</VaNavbarItem>
			<VaNavbarItem v-if="currentDevice.isMobile" class="logo mainlogo">
				MaguroNetwork
			</VaNavbarItem>
			<NuxtImg
				v-if="
					currentDevice.isMobile &&
					(currentSite === 'Weebsite' ||
						currentSite === 'RandomMemes')
				"
				:src="useNavbarIconStore().src"
				style="width: 2em; height: 2em"
			/>
			<Icon
				v-else-if="currentDevice.isMobile"
				:name="useNavbarIconStore().iconName"
				size="2em"
			/>
		</template>
		<template v-if="!currentDevice.isMobile" #default>
			<VaNavbarItem class="title">
				<span class="logo mainlogo">MaguroNetwork</span>
			</VaNavbarItem>
		</template>
		<template v-if="!currentDevice.isMobile" #right>
			<NuxtImg
				v-if="
					currentSite === 'Weebsite' || currentSite === 'RandomMemes'
				"
				:src="useNavbarIconStore().src"
				style="width: 2em; height: 2em"
			/>
			<Icon v-else :name="useNavbarIconStore().iconName" size="2em" />
		</template>
	</VaNavbar>
</template>

<script lang="ts" setup>
import { useNavbarIconStore } from '~/stores/navbarIcon';
const currentDevice = useDevice();
const currentSite = useRoute().meta.parentName;
const sidebarEnable = useSidebarEnable();
</script>

<style>
.navbarroot {
	--s: 200px; /* control the size */
	--c1: #1d1d1d;
	--c2: #4e4f51;
	--c3: #3c3c3c;

	background: repeating-conic-gradient(
				from 30deg,
				#0000 0 120deg,
				var(--c3) 0 180deg
			)
			calc(0.5 * var(--s)) calc(0.5 * var(--s) * 0.577),
		repeating-conic-gradient(
			from 30deg,
			var(--c1) 0 60deg,
			var(--c2) 0 120deg,
			var(--c3) 0 180deg
		);
	background-size: var(--s) calc(var(--s) * 0.577);
	/* 0.577 = tan(30deg)*/
}
.title {
	border: red 1px dotted;
	box-shadow: #1d1d1d;
}
</style>
