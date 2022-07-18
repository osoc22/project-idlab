<script lang="ts">
	import type { UpcommingActivity } from '$lib/types/calendarEvents';
	import Button from './Button.svelte';

	export let event: UpcommingActivity;

	$: timeFrom = event.time?.from.toString({ smallestUnit: 'minute' });
	$: timeTo = event.time?.to.toString({ smallestUnit: 'minute' });
</script>

<Button focused on:click>
	<div class="flex justify-between items-end mb-2">
		<span class="text-lg text-bol">{event.title}</span>
		<span class="text-sm">
			{#if event.isAllDay}
				All day
			{:else}
				{timeFrom}-{timeTo}
			{/if}
		</span>
	</div>
</Button>
