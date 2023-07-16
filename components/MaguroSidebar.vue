<template>
	<VaSidebar
		v-model="sidebarEnabled"
		position="left"
		style="position: absolute; z-index: 3"
	>
		<VaSidebarItem tag="div" @click="useToggleSidebar(!sidebarEnabled)">
			<VaSidebarItemContent style="text-align: center">
				<VaButton icon="va-arrow-left" aria-label="Close Sidebar" />
			</VaSidebarItemContent>
		</VaSidebarItem>

		<VaSidebarItem
			:to="{ name: 'index' }"
			:active="$route.name === 'index'"
		>
			<VaSidebarItemContent>
				<VaSidebarItemTitle> MaguroNetwork </VaSidebarItemTitle>
			</VaSidebarItemContent>
		</VaSidebarItem>

		<VaSidebarItem
			:to="{ name: 'Akela' }"
			:active="$route.name === 'Akela'"
		>
			<VaSidebarItemContent>
				<VaSidebarItemTitle> Akela </VaSidebarItemTitle>
				<Icon name="twemoji:dog-face" size="2rem" />
			</VaSidebarItemContent>
		</VaSidebarItem>

		<VaSidebarItem
			:to="{ name: 'EnergyDrinkWiki' }"
			:active="$route.name === 'EnergyDrinkWiki'"
		>
			<VaSidebarItemContent>
				<VaSidebarItemTitle> EnergyDrinkWiki </VaSidebarItemTitle>
				<Icon name="pepicons:can" size="2em" />
			</VaSidebarItemContent>
		</VaSidebarItem>

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
					alt="RandomMemes"
				/>
			</VaSidebarItemContent>
		</VaSidebarItem>

		<VaSidebarItem
			:to="{ name: 'Vegalou' }"
			:active="$route.name === 'Vegalou'"
		>
			<VaSidebarItemContent>
				<VaSidebarItemTitle> Vegalou </VaSidebarItemTitle>
				<Icon name="twemoji:llama" size="2em" />
			</VaSidebarItemContent>
		</VaSidebarItem>

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
					alt="Weebsite"
				/>
			</VaSidebarItemContent>
		</VaSidebarItem>

		<VaSidebarItem href="https://oldr4e.littlebitgay.de">
			<VaSidebarItemContent>
				<VaSidebarItemTitle>
					<span>Razer4Ever</span>
					<VaIcon name="open_in_new" />
				</VaSidebarItemTitle>
				<Icon name="simple-icons:razer" size="2em" />
			</VaSidebarItemContent>
		</VaSidebarItem>

		<VaSidebarItem href="https://rg.littlebitgay.de">
			<VaSidebarItemContent>
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
