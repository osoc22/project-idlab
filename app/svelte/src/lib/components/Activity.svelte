<script lang="ts">
	import type { PlannedActivity } from '$lib/types/calendarEvents';
	import type WeatherType from '$lib/types/weatherTypes';

	import Button from './Button.svelte';

	export let activity: PlannedActivity;
	export let weatherType: WeatherType | undefined;

	$: timeFrom = activity.time?.from.toString({ smallestUnit: 'minute' });
	$: timeTo = activity.time?.to.toString({ smallestUnit: 'minute' });
	$: notifies = Array.from(activity.notifyOnWeather);
</script>

<div>
	<Button focused on:click>
		<div class="flex flex-col items-start mb-2 text-left">
			<span class="text-xs font-light">
				{#if activity.isAllDay}
					All day
				{:else}
					{timeFrom}-{timeTo}
				{/if}
				{#if activity.location}
					- {activity.location}
				{/if}
			</span>

			<span class="font-medium mt-1">{activity.title}</span>

			{#if weatherType && notifies.map((n) => n.toLowerCase()).includes(weatherType)}
				<div class="mt-2 relative">
					<p class="text-sm font-light">Weather is {weatherType}.</p>

					<Button>
						<span class="text-sm">Would you like to reschedule?</span>
						<div class="w-3 h-3 absolute -top-3 -right-5">
							<div class="bg-blue-500 h-full rounded-full" />
							<div
								class="animate-ping absolute top-0 w-full bg-blue-500 h-full rounded-full opacity-75"
							/>
						</div>
					</Button>
				</div>
			{:else}
				<span class="font-light text-xs mt-3">
					You are beining notified when the weather is {notifies.join(', ')}.
				</span>
			{/if}
		</div>
	</Button>
</div>
