<script lang="ts">
	import { Temporal } from '@js-temporal/polyfill';
	import { onMount } from 'svelte';

	import { activitiesPerDay, modifyPlannedActivity } from '$lib/stores/eventStore';
	import { PlannedActivity, TIME_ZONE } from '$lib/types/calendarEvents';

	import Activity from '$lib/components/Activity.svelte';
	import WeatherComponent from '$lib/components/Weather.svelte';
	import type { Weather } from '$lib/utils/parseWeather';
	import { Plus } from 'svelte-hero-icons';
	import RoundButton from './RoundButton.svelte';

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
		<div
			class="relative grow max-w-xs border-r last:border-r-0 flex flex-shrink-0 flex-col w-[14%]"
		>
			<!-- Date title with name of day (i.e Mon), the date as [dd::MM:YYYY] and a plus button to add a new event -->
			<div class="py-2 flex items-center justify-center text-sm border-b">
				<span class="text-gray-400 font-light mr-1">{dayOfWeekString[day.dayOfWeek - 1]}</span>
				<span
					class="font-medium h-8 flex items-center justify-center"
					class:today={day.equals(today)}>{day.day}</span
				>
				<div class="absolute right-2">
					<RoundButton icon={Plus} on:click={() => newActivityOn(day)} />
				</div>
			</div>

			<WeatherComponent {weather} {day} let:forecast let:weatherType>
				<div class="flex flex-col p-3 gap-4">
					{#if day.toString() in $activitiesPerDay}
						{#each $activitiesPerDay[day.toString()] as activity}
							<Activity
								{weatherType}
								{activity}
								on:click={() => modifyPlannedActivity.edit(activity)}
							/>
						{/each}
					{/if}
				</div>
			</WeatherComponent>
		</div>
	{/each}
</div>

<style lang="postcss">
	.today {
		@apply rounded-full bg-green-700 w-8 h-8 flex items-center justify-center text-white;
	}
</style>
