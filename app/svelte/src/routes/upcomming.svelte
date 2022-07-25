<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch }) => {
		const url = `https://idlab.osoc.be/weather/Brussels`;
		const response = await fetch(url);

		console.log({ response });

		return {
			status: response.status,
			props: {
				rdfWeatherArray: response.ok && (await response.json())
			}
		};
	};
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { Temporal } from '@js-temporal/polyfill';

	import Calendar from '$lib/components/Calendar.svelte';
	import { type RdfWeatherData, Weather } from '$lib/utils/parseWeather';

	export let rdfWeatherArray: RdfWeatherData[];

	const today = Temporal.Now.plainDateISO();
	let startOfWeek: Temporal.PlainDate;
	let weather: Weather;

	function gotoToday() {
		startOfWeek = today.subtract({ days: today.dayOfWeek - 1 });
		return startOfWeek;
	}

	// On load
	onMount(async () => {
		weather = Weather.fromRDF(rdfWeatherArray);

		gotoToday();
	});
</script>

<Calendar {startOfWeek} {weather} />
