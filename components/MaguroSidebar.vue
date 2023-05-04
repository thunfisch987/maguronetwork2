<template>
	<VaSidebar
		v-model="sidebarEnabled"
		position="left"
		style="position: absolute; z-index: 3"
	>
		<VaSidebarItem @click="useToggleSidebar(false)">
			<VaSidebarItemContent style="text-align: center">
				<VaSidebarItemTitle />
				<VaButton icon="va-arrow-left" />
			</VaSidebarItemContent>
		</VaSidebarItem>
		<!--  -->
		<!-- MagurNetwork -->
		<!--  -->
		<VaSidebarItem
			:to="{ name: 'index' }"
			:active="$route.name === 'index'"
		>
			<VaSidebarItemContent>
				<VaSidebarItemTitle> MaguroNetwork </VaSidebarItemTitle>
			</VaSidebarItemContent>
		</VaSidebarItem>
		<!--  -->
		<!-- twemoji:dog-face Akela -->
		<!--  -->
		<VaSidebarItem
			:to="{ name: 'Akela' }"
			:active="$route.name === 'Akela'"
		>
			<VaSidebarItemContent>
				<Icon name="twemoji:dog-face" size="2em" />
				<VaSidebarItemTitle> Akela </VaSidebarItemTitle>
			</VaSidebarItemContent>
		</VaSidebarItem>
		<!--  -->
		<!-- pepicons:can EnergyDrinkWiki -->
		<!--  -->
		<VaSidebarItem
			:to="{ name: 'EnergyDrinkWiki' }"
			:active="$route.name === 'EnergyDrinkWiki'"
		>
			<VaSidebarItemContent>
				<Icon name="pepicons:can" size="2em" />
				<VaSidebarItemTitle> EnergyDrinkWiki </VaSidebarItemTitle>
			</VaSidebarItemContent>
		</VaSidebarItem>
		<!--  -->
		<!-- RandomMemes -->
		<!--  -->
		<VaSidebarItem
			:to="{ name: 'RandomMemes' }"
			:active="$route.name === 'RandomMemes'"
		>
			<VaSidebarItemContent>
				<NuxtImg
					src="/fuckboi.png"
					loading="lazy"
					style="width: 2em; height: 2em"
				/>
				<VaSidebarItemTitle> RandomMemes </VaSidebarItemTitle>
			</VaSidebarItemContent>
		</VaSidebarItem>
		<!--  -->
		<!-- twemoji:llama Vegalou -->
		<!--  -->
		<VaSidebarItem
			:to="{ name: 'Vegalou' }"
			:active="$route.name === 'Vegalou'"
		>
			<VaSidebarItemContent>
				<Icon name="twemoji:llama" size="2em" />
				<VaSidebarItemTitle> Vegalou </VaSidebarItemTitle>
			</VaSidebarItemContent>
		</VaSidebarItem>
		<!--  -->
		<!-- Nölz Weebsite -->
		<!--  -->
		<VaSidebarItem
			:to="{ name: 'Weebsite' }"
			:active="$route.name === 'Weebsite'"
		>
			<VaSidebarItemContent>
				<NuxtImg
					:src="useWeebsiteImagesStore().current"
					style="width: 2em; height: 2em"
					loading="lazy"
				/>
				<VaSidebarItemTitle> Weebsite </VaSidebarItemTitle>
			</VaSidebarItemContent>
		</VaSidebarItem>
		<!--  -->
		<!-- simple-icons:razer Razer4Ever -->
		<!--  -->
		<VaSidebarItem href="https://oldr4e.littlebitgay.de">
			<VaSidebarItemContent>
				<Icon name="simple-icons:razer" size="2em" />
				<VaSidebarItemTitle> Razer4Ever </VaSidebarItemTitle>
				<VaIcon name="open_in_new" />
			</VaSidebarItemContent>
		</VaSidebarItem>
		<!--  -->
		<!-- twemoji:rocket Rocketgame -->
		<!--  -->
		<VaSidebarItem href="https://rg.littlebitgay.de">
			<VaSidebarItemContent>
				<Icon name="twemoji:rocket" size="2em" />
				<VaSidebarItemTitle> Rocketgame </VaSidebarItemTitle>
				<VaIcon name="open_in_new" />
			</VaSidebarItemContent>
		</VaSidebarItem>
	</VaSidebar>
</template>

<script lang="ts" setup>
import { useWeebsiteImagesStore } from '~/stores/weebsiteImages';

const sidebarEnabled = useSidebarEnable();
</script>
