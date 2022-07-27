<script lang="ts">
	import { Temporal } from '@js-temporal/polyfill';
	import { onMount } from 'svelte';

	import type { Weather, WeatherDay } from '$lib/utils/parseWeather';
	import type WeatherType from '$lib/types/weatherTypes';
	import CustomIcon from '$lib/components/icons/CustomIcon.svelte';

	export let day: Temporal.PlainDate;
	export let weather: Weather;

	let forecast: WeatherDay | undefined;
	let weatherType: WeatherType | undefined;

	onMount(() => {
		const today = Temporal.Now.plainDateISO();

		const untilToday = today.until(day).days;

		// if weather day is in the past than reject
		if (untilToday < 0) return;

		const weatherData = weather.getWeatherDataFor(day);
		if (!weatherData) return;

		forecast = weatherData;

		if (forecast.temperature < 0) {
			weatherType = 'snow';
		} else if (forecast.temperature <= 10) {
			weatherType = 'cloudy';
		} else if (forecast.temperature <= 25) {
			weatherType = 'partly-cloudy';
		} else {
			weatherType = 'sun';
		}
	});
</script>

<div class="flex flex-col p-3 min-h-[38] border-b">
	{#if forecast}
		<div class="bg-blue-100 rounded-md min-h-4 p-4 select-none relative text-slate-800">
			<div class="flex gap-2">
				<span>{forecast.minimumTemperature}°C</span> - <span>{forecast.maximumTemperature}°C</span>
			</div>

			<div class="absolute h-6 aspect-square rounded-full bg-blue-700 -right-1 -top-1">
				<div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
					{#if weatherType}
						<CustomIcon icon={weatherType} />
					{/if}
				</div>
			</div>
		</div>
	{:else}
		<div class="rounded-md min-h-4 p-4 select-none relative italic text-gray-400 text-center ">
			unavailable
		</div>
	{/if}
</div>

<slot {forecast} {weatherType} />
