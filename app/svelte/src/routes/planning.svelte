<script lang="ts">
	import Button from '$lib/components/Button.svelte';

	import { modifyPlannedActivity, plannedActivities } from '$lib/stores/eventStore';
	import { PlannedActivity, TIME_ZONE } from '$lib/types/calendarEvents';
	import { Temporal } from '@js-temporal/polyfill';
	import { onMount } from 'svelte';
	import { Icon, Pencil } from 'svelte-hero-icons';

	onMount(() => {
		if ($plannedActivities.length) return;

		const d1 = Temporal.Now.plainDateISO(TIME_ZONE);
		const d2 = d1.add({ days: 1 });
		const d3 = d1.add({ days: 2 });

		const t = Temporal.Now.plainTimeISO(TIME_ZONE);
		const t1 = { from: t, to: t.add({ minutes: 30 }) };
		const t2 = { from: t.add({ minutes: 90 }), to: t.add({ minutes: 180 }) };
		const e1 = new PlannedActivity('Test1', 'Work', new Set(['Windy', 'Rain']), [d1, d2]);
		const e2 = new PlannedActivity('Test2', 'Fun', new Set(['Windy', 'Rain']), [d1, d3], [t1, t2]);

		plannedActivities.add(e1);
		plannedActivities.add(e2);
	});
</script>

{#each $plannedActivities as plannedActivity}
	<div
		class="max-w-3xl mx-auto rounded-md bg-blue-50 border-blue-700 text-blue-900 border-2 mb-2 p-4"
	>
		<div class="text-xl mb-2 flex items-center gap-2">
			<span>{plannedActivity.title}</span>
			<span class="text-sm h-min">| {plannedActivity.actitityType} actvity</span>
		</div>

		<!-- DATES AND TIMES -->
		<div class="grid grid-cols-[min-content_1fr] gap-4 items-center">
			<div>Dates:</div>
			<div class="options">
				{#each plannedActivity.dates as date}
					<div class="option">{date.toString()}</div>
				{/each}
			</div>

			<div class="whitespace-nowrap">Is all day:</div>
			{#if plannedActivity.isAllDay}
				<div class="text-sm">Yes</div>
			{:else}
				<div class="text-sm">No</div>
				<div>Times:</div>
				<div class="options">
					{#each plannedActivity.times as time}
						<div class="option">
							{time.from.round({ smallestUnit: 'minute' }).toString()}-
							{time.to.round({ smallestUnit: 'minute' }).toString()}
						</div>
					{/each}
				</div>
			{/if}
		</div>

		<div class="flex justify-end">
			<Button on:click={() => modifyPlannedActivity.edit(plannedActivity)} filled icon={Pencil}>
				Edit
			</Button>
		</div>
	</div>
{/each}

<style lang="postcss">
	.options {
		@apply flex flex-wrap gap-2;
	}

	.option {
		@apply text-sm p-2 rounded border-2 border-blue-700 cursor-pointer hover:bg-blue-300;
	}
</style>
