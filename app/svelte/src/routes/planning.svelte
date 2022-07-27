<script lang="ts">
	import Button from '$lib/components/Button.svelte';

	import { modifyUnplannedActivity, unplannedActivities } from '$lib/stores/eventStore';
	import { Pencil } from 'svelte-hero-icons';

	import { tester } from '$lib/utils/solidInterface';
	window.tester = tester;
</script>

<div class="max-w-3xl mx-auto rounded-md bg-red-50 border-red-700 text-red-900 border-2 mb-2 p-4">
	WARNING: this page only works client-side, and will not save to the Solid pod.<br />
	This page is kept for future expansion and/or as proof of concept.
</div>

{#each $unplannedActivities as plannedActivity}
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

			{#key plannedActivity.times}
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
			{/key}
		</div>

		<div class="flex justify-end">
			<Button on:click={() => modifyUnplannedActivity.edit(plannedActivity)} filled icon={Pencil}>
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
