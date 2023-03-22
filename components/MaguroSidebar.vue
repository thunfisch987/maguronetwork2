<template>
	<VaSidebar
		position="left"
		v-model="sidebarEnabled"
		style="position: absolute; z-index: 3"
	>
		<VaSidebarItem @click="toggleSidebar(false)">
			<VaSidebarItemContent style="text-align: center">
				<VaSidebarItemTitle></VaSidebarItemTitle>
				<VaButton icon="va-arrow-left"></VaButton>
			</VaSidebarItemContent>
		</VaSidebarItem>
		<template
			v-for="[itemname, item] of Object.entries(sidebarItems)"
			:key="itemname"
		>
			<VaSidebarItem
				v-if="!item.href"
				:active="item.active"
				:to="{ name: item.to }"
			>
				<VaSidebarItemContent>
					<NuxtImg
						v-if="itemname === 'RandomMemes'"
						:src="item.image"
						style="width: 2em; height: 2em"
					/>
					<NuxtImg
						v-else-if="itemname === 'Nölz\' Weebsite'"
						:src="weebsiteImages[weebsiteImages.current]"
						style="width: 2em; height: 2em"
						loading="lazy"
					/>
					<Icon v-else :name="item.icon!" size="2em" />
					<VaSidebarItemTitle>
						{{ itemname }}
					</VaSidebarItemTitle>
				</VaSidebarItemContent>
			</VaSidebarItem>
			<VaSidebarItem v-else :active="item.active" :href="item.href">
				<VaSidebarItemContent>
					<Icon :name="item.icon!" size="2em" />
					<VaSidebarItemTitle>
						{{ itemname }}
					</VaSidebarItemTitle>
					<VaIcon name="open_in_new" />
				</VaSidebarItemContent>
			</VaSidebarItem>
		</template>
	</VaSidebar>
</template>

<script lang="ts" setup>
const sidebarEnabled = useSidebarEnable();
const toggleSidebar = useToggleSidebar();
const sidebarItems = useSidebarItems();

const weebsiteImages = useWeebsiteImages();
</script>
