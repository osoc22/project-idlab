<script lang="ts">
	import Clouds from './Clouds.svelte';
	import Snow from './Snow.svelte';
	import Sun from './Sun.svelte';
	import PartiallyCloudy from './PartiallyCloudy.svelte';

	export let icon: 'sun' | 'snow' | 'cloudy' | 'part_cloudy' = 'sun';
	export let size: number = 14;
	export let color: string = 'white';
</script>

{#if icon == 'sun'}
	<Sun {color} {size} />
{:else if icon == 'snow'}
	<Snow {color} {size} />
{:else if icon == 'cloudy'}
	<Clouds {color} {size} />
{:else if icon == 'part_cloudy'}
	<PartiallyCloudy {color} {size} />
{/if}
