<template>
	<ul style="color: white">
		<li v-for="currentRoute in currentRoutes">
			{{ currentRoute.name }}
		</li>
	</ul>
</template>

<script lang="ts" setup>
const currentRoutes = useRouter().getRoutes();
</script>
