<script lang="ts">
	import { Temporal } from '@js-temporal/polyfill';
	import { onMount } from 'svelte';

	import type { Weather, WeatherDay } from '$lib/utils/parseWeather';
	import CustomIcon from '$lib/components/icons/CustomIcon.svelte';

	export let day: Temporal.PlainDate;
	export let weather: Weather;

	let forecast: WeatherDay;

	onMount(() => {
		const today = Temporal.Now.plainDateISO();

		const untilToday = today.until(day).days;

		// if weather day is in the past than reject
		if (untilToday < 0) return;

		const weatherData = weather.getWeatherDataFor(day);
		if (!weatherData) return;

		forecast = weatherData;
	});
</script>

{#if forecast}
	<div class="bg-blue-200 rounded-md min-h-4 px-3 py-1 select-none relative">
		<span class="">
			{forecast.minimumTemperature}-{forecast.maximumTemperature}°C
		</span>

		<div class="absolute h-6 aspect-square rounded-full bg-blue-700 -right-1 -top-1">
			<div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
				{#if forecast.temperature <= 0}
					<CustomIcon icon="snow" />
				{:else if forecast.temperature <= 10}
					<CustomIcon icon="cloudy" />
				{:else if forecast.temperature <= 25}
					<CustomIcon icon="part_cloudy" />
				{:else}
					<CustomIcon icon="sun" />
				{/if}
			</div>
		</div>
	</div>
{/if}

{#if !forecast}
	<div class="bg-blue-50 rounded-md min-h-4 px-3 py-1 select-none relative">
		<span class="italic text-gray-500">unavailable</span>
	</div>
{/if}
