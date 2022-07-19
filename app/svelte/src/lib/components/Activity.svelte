<script lang="ts">
	import type { PlannedActivity } from '$lib/types/calendarEvents';
	import Button from './Button.svelte';

	export let activity: PlannedActivity;

	$: timeFrom = activity.time?.from.toString({ smallestUnit: 'minute' });
	$: timeTo = activity.time?.to.toString({ smallestUnit: 'minute' });
</script>

<Button focused on:click>
	<div class="flex justify-between items-end mb-2">
		<span class="text-lg text-bol">{activity.title}</span>
		<span class="text-sm">
			{#if activity.isAllDay}
				All day
			{:else}
				{timeFrom}-{timeTo}
			{/if}
		</span>
	</div>
</Button>
