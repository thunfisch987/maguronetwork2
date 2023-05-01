<template>
	<div class="grid h-screen place-items-center">
		<span> four - oh - four </span>
		<br />
		<hr />
		<br />
		<span>{{ props.error }}</span>
	</div>
</template>

<script setup lang="ts">
import Error from 'nuxt';

const props = defineProps<{ error: Object }>();
console.log('------');
console.dir(props.error);
console.log('------');

const names = [
	'Traveller',
	'M8',
	'Thanos',
	'Random Person',
	'Visitor',
	'Again',
	'Blyat',
	'Mr. Stark',
	'Carl',
];
const names2 = [
	{
		first: 'Wake up,',
		last: 'Samurai',
		special: ', we have a city to burn!',
		reference: 'Cyberpunk 2077',
	},
	{
		first: 'Rise and Shine,',
		last: 'Mr. Freeman',
		special: ', Rise and Shine',
		reference: 'Half Life',
	},
	{
		first: 'Hello...  ',
		last: "  ...it's me",
		reference: 'Adele',
	},
	{
		first: '',
		last: '',
		reference: '',
	},
	{
		first: '',
		last: '',
		reference: '',
	},
	{
		first: '',
		last: '',
		reference: '',
	},
];
</script>
