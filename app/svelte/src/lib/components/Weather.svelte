<script lang="ts">
	import { Temporal } from '@js-temporal/polyfill';
	import { onMount } from 'svelte';

	import type { ForecastDay } from '$lib/types/weather';
	import WeatherData from '$lib/hardcoded/weather';

	export let day: Temporal.PlainDate;

	let forecast: ForecastDay | undefined;

	onMount(() => {
		const today = Temporal.Now.plainDateISO();
		const daysUntilDay = today.until(day).days;

		forecast = WeatherData.getForecast(daysUntilDay);
	});
</script>

{#if forecast}
	<div class="bg-blue-200 rounded-md min-h-4 p-3 select-none relative">
		<span class="text-lg">
			{forecast.day.mintemp_c}-{forecast.day.maxtemp_c}°C
		</span>

		<div class="absolute h-6 aspect-square rounded-full bg-blue-700 -right-1 -top-1">
			<div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">🌤</div>
		</div>
	</div>
{/if}
