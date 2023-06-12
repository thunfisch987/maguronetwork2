<template>
	<VaNavbar class="navbarroot">
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
