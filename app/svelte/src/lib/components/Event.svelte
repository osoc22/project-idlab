<script lang="ts">
	import type { CalendarEvent } from '$lib/types/calendarEvents';
	import Button from './Button.svelte';

	export let event: CalendarEvent;

	$: timeFrom = event.time.from.toString({ smallestUnit: 'minute' });
	$: timeTo = event.time.to.toString({ smallestUnit: 'minute' });
</script>

<Button focused on:click>
	<div class="flex justify-between items-end mb-2">
		<span class="text-lg text-bol">{event.title}</span>
		<span class="text-sm">
			{timeFrom}-{timeTo}
		</span>
	</div>
	<div class="text-sm line-clamp-3">
		{event.description}
	</div>
</Button>
