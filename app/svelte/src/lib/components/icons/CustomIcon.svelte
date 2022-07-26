<script lang="ts">
	import Clouds from './Clouds.svelte';
	import Snow from './Snow.svelte';
	import Sun from './Sun.svelte';
	import PartiallyCloudy from './PartiallyCloudy.svelte';
	import type WeatherType from '$lib/types/weatherTypes';

	export let icon: WeatherType = 'sun';
	export let size: number = 14;
	export let color: string = 'white';
</script>

{#if icon == 'sun'}
	<Sun {color} {size} />
{:else if icon == 'snow'}
	<Snow {color} {size} />
{:else if icon == 'cloudy'}
	<Clouds {color} {size} />
{:else if icon == 'partly-cloudy'}
	<PartiallyCloudy {color} {size} />
{/if}
