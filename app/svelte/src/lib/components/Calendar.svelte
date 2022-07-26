<script lang="ts">
	import { Temporal, Intl } from '@js-temporal/polyfill';
	import { onMount } from 'svelte';

	import { activitiesPerDay, modifyPlannedActivity } from '$lib/stores/eventStore';
	import { PlannedActivity, TIME_ZONE } from '$lib/types/calendarEvents';

	import Button from '$lib/components/Button.svelte';
	import Activity from '$lib/components/Activity.svelte';
	import WeatherComponent from '$lib/components/Weather.svelte';
	import type { Weather } from '$lib/utils/parseWeather';
	import { Plus } from 'svelte-hero-icons';

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

<div class="m-4 flex container mx-auto h-full w-full">
	{#each week as day}
		<div class="grow max-w-xs border-r last:border-r-0 flex flex-shrink-0 flex-col w-[14%]">
			<!-- Date title with name of day (i.e Mon), the date as [dd::MM:YYYY] and a plus button to add a new event -->
			<div class="py-2 flex items-center justify-center text-sm border-b">
				<span class="text-gray-400 font-light mr-1">{dayOfWeekString[day.dayOfWeek - 1]}</span>
				<span
					class="font-medium h-8 flex items-center justify-center"
					class:today={day.equals(today)}>{day.day}</span
				>
			</div>

			<div class="flex flex-col p-4 min-h-[38] border-b">
				<WeatherComponent {weather} {day} />
			</div>

			<div class="flex flex-col my-4 p-4 gap-4">
				{#if day.toString() in $activitiesPerDay}
					{#each $activitiesPerDay[day.toString()] as activity}
						<Activity {activity} on:click={() => modifyPlannedActivity.edit(activity)} />
					{/each}
				{:else}
					<div>
						<Button icon={Plus} on:click={() => newActivityOn(day)}>Create event</Button>
					</div>
				{/if}
			</div>
		</div>
	{/each}
</div>

<style lang="postcss">
	.today {
		@apply rounded-full bg-green-700 w-8 h-8 flex items-center justify-center text-white;
	}
</style>
