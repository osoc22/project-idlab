<script lang="ts">
	import { Temporal, Intl } from '@js-temporal/polyfill';
	import { onMount } from 'svelte';

	import { activitiesPerDay, modifyPlannedActivity } from '$lib/stores/eventStore';
	import { PlannedActivity, TIME_ZONE } from '$lib/types/calendarEvents';

	import Button from '$lib/components/Button.svelte';
	import Activity from '$lib/components/Activity.svelte';
	import WeatherComponent from '$lib/components/Weather.svelte';
	import type { Weather } from '$lib/utils/parseWeather';

	export let startOfWeek: Temporal.PlainDate;
	export let weather: Weather;
	const today = Temporal.Now.plainDateISO(TIME_ZONE);

	const dayOfWeekString = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
	let week: Temporal.PlainDate[] = [];

	$: {
		startOfWeek && (week = dayOfWeekString.map((_, index) => startOfWeek.add({ days: index })));
	}

	function newActivityOn(day: Temporal.PlainDate) {
		modifyPlannedActivity.set({
			editMode: false,
			activity: PlannedActivity.new(day)
		});
	}

	onMount(() => {
		PlannedActivity.init();
	});
</script>

<div class="m-4 flex gap-3 container mx-auto">
	{#each week as day}
		<div class="grow max-w-xs">
			<!-- Date title with name of day (i.e Mon), the date as [dd::MM:YYYY] and a plus button to add a new event -->
			<div class="py-2" class:today={day.equals(today)}>
				<span class="font-lg">{dayOfWeekString[day.dayOfWeek - 1]}</span>
				{Intl.DateTimeFormat('gb-GB').format(day)}
			</div>

			<div class="flex flex-col gap-4 my-4">
				<WeatherComponent {weather} {day} />

				{#if day.toString() in $activitiesPerDay}
					{#each $activitiesPerDay[day.toString()] as activity}
						<Activity {activity} on:click={() => modifyPlannedActivity.edit(activity)} />
					{/each}
				{:else}
					<Button filled on:click={() => newActivityOn(day)}>Create event</Button>
				{/if}
			</div>
		</div>
	{/each}
</div>

<style lang="postcss">
	.today {
		@apply font-bold border-b-2 text-blue-900 border-blue-900;
	}
</style>
