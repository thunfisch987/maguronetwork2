<template>
	<ul style="color: white">
		<li
			v-for="route in $router.getRoutes()"
			style="color: white"
		>
			{{ route.name?.toString().split("-")[0] }}
		</li>
	</ul>
</template>
