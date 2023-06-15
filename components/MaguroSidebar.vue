<template>
	<VaSidebar
		v-model="sidebarEnabled"
		position="left"
		style="position: absolute; z-index: 3"
	>
		<VaSidebarItem @click="useToggleSidebar(!sidebarEnabled)">
			<VaSidebarItemContent style="text-align: center">
				<VaSidebarItemTitle />
				<VaButton icon="va-arrow-left" />
			</VaSidebarItemContent>
		</VaSidebarItem>
		<!--  -->
		<!-- MaguroNetwork -->
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
				<VaSidebarItemTitle> Akela </VaSidebarItemTitle>
				<Icon name="twemoji:dog-face" size="2rem" />
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
				<VaSidebarItemTitle> EnergyDrinkWiki </VaSidebarItemTitle>
				<Icon name="pepicons:can" size="2em" />
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
				<VaSidebarItemTitle> RandomMemes </VaSidebarItemTitle>
				<NuxtImg
					src="fuckboi.png"
					loading="lazy"
					style="width: 2em; height: 2em"
				/>
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
				<VaSidebarItemTitle> Vegalou </VaSidebarItemTitle>
				<Icon name="twemoji:llama" size="2em" />
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
				<VaSidebarItemTitle> Weebsite </VaSidebarItemTitle>
				<NuxtImg
					:src="useWeebsiteImagesStore().currentImage"
					style="width: 2em; height: 2em"
					loading="lazy"
				/>
			</VaSidebarItemContent>
		</VaSidebarItem>
		<!--  -->
		<!-- simple-icons:razer Razer4Ever -->
		<!--  -->
		<VaSidebarItem href="https://oldr4e.littlebitgay.de">
			<VaSidebarItemContent>
				<!-- <VaIcon name="open_in_new" /> -->
				<VaSidebarItemTitle>
					<span>Razer4Ever</span>
					<VaIcon name="open_in_new" />
				</VaSidebarItemTitle>
				<Icon name="simple-icons:razer" size="2em" />
			</VaSidebarItemContent>
		</VaSidebarItem>
		<!--  -->
		<!-- twemoji:rocket Rocketgame -->
		<!--  -->
		<VaSidebarItem href="https://rg.littlebitgay.de">
			<VaSidebarItemContent>
				<!-- <VaIcon name="open_in_new"/> -->
				<VaSidebarItemTitle>
					<span>Rocketgame</span>
					<VaIcon name="open_in_new" />
				</VaSidebarItemTitle>
				<Icon name="twemoji:rocket" size="2em" />
			</VaSidebarItemContent>
		</VaSidebarItem>
	</VaSidebar>
</template>

<script lang="ts" setup>
import { useWeebsiteImagesStore } from '~/stores/weebsiteImages';

const sidebarEnabled = useSidebarEnable();
</script>
