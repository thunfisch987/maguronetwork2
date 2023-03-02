<template>
	<ul style="color: white">
		<li style="color: white" v-for="route in $router.getRoutes()">
			{{ route.name?.toString().split("-")[0] }}
		</li>
	</ul>
</template>

<script lang="ts" setup></script>
