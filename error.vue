<template>
	<div>
		<span>{{ props.error.statusCode }}</span>
	</div>
</template>

<script setup lang="ts">
type ErrorProps = {
	url: string;
	statusCode: 404;
	statusMessage: string;
	message: string;
	stack: string;
};

const props = defineProps<{ error: ErrorProps }>();

const names = ['Thanos', 'Random Person', 'Again', 'Carl'];
type Quotes = {
	first: string;
	last: string;
	special?: string;
	reference: string;
};

const names2: Array<Quotes> = [
	{
		first: 'Wake up, ',
		last: 'Samurai, ',
		special: 'we have a city to burn!',
		reference: 'Cyberpunk 2077',
	},
	{
		first: 'Rise and Shine, ',
		last: 'Mr. Freeman, ',
		special: 'Rise and Shine',
		reference: 'Half Life',
	},
	{
		first: 'Hello...  ',
		last: "  ...it's me",
		reference: 'Adele',
	},
	{
		first: 'Hey you!',
		last: "You're finally awake!",
		reference: 'Todroll, Skyrim',
	},
	{
		first: 'Mr. Stark, ',
		last: "i don't feel so good...",
		reference: 'MCU/Avengers',
	},
	{
		first: "Mornin', ",
		last: 'Traveller',
		reference: '???',
	},
	{
		first: 'Take this, ',
		last: "it's dangerous to go alone",
		reference: 'Zelda',
	},
	{
		first: 'Hello',
		last: 'from the other side...',
		reference: 'Adele',
	},
];
</script>
