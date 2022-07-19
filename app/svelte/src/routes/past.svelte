<script>
	import { pastActivities } from '$lib/stores/eventStore';
	import { TIME_ZONE } from '$lib/types/calendarEvents';
	import { Temporal } from '@js-temporal/polyfill';
</script>

<h1>Past activities</h1>
<pre>{JSON.stringify($pastActivities, null, 2)}</pre>

{#each $pastActivities as $activity}
	<div>
		<h2>{$activity.title}</h2>
		{$activity.date.until(Temporal.Now.plainDateISO(TIME_ZONE)).days}
	</div>
{/each}

{#each $pastActivities as activity}
	<div
		class="max-w-3xl mx-auto rounded-md bg-green-50 border-green-700 text-green-900 border-2 mb-2 p-4"
	>
		<div class="text-xl mb-2 flex items-center gap-2">
			<span>{activity.title}</span>
			<span class="text-sm h-min">| {activity.actitityType} actvity</span>
		</div>

		<!-- DATES AND TIMES -->
		<div class="grid grid-cols-[min-content_1fr] gap-4 items-center">
			<div>Date:</div>
			<div class="options">
				<div class="option">{activity.date.toString()}</div>
			</div>

			<div class="whitespace-nowrap">Is all day:</div>
			{#if activity.isAllDay}
				<div class="text-sm">Yes</div>
			{:else if activity.time}
				<div class="text-sm">No</div>
				<div>Time:</div>
				<div class="options">
					<div class="option">
						{activity.time.from.toString({ smallestUnit: 'minute' })}-
						{activity.time.to.toString({ smallestUnit: 'minute' })}
					</div>
				</div>
			{/if}
		</div>
	</div>
{/each}

<style lang="postcss">
	.options {
		@apply flex flex-wrap gap-2;
	}

	.option {
		@apply text-sm p-2 rounded border-2 border-green-700 cursor-pointer hover:bg-green-300;
	}
</style>
