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
	<div class="weather">
		{forecast.day.mintemp_c}-{forecast.day.maxtemp_c}°C

		<div class="weatherIcon">🌤</div>
	</div>
{/if}

<style>
	.weather {
		position: relative;
		font-size: 1.2rem;
		height: 4rem;
		border-radius: 1rem;
		padding: 1rem;
		background-color: #6f9dbf;
		user-select: none;
	}

	.weatherIcon {
		position: absolute;
		top: 50%;
		right: 1rem;
		transform: translateY(-50%);
		font-size: 2rem;
	}
</style>
