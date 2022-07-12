<script lang="ts">
	import type { CalendarEvent } from '$lib/types/calendarEvents';
	import Button from './Button.svelte';

	export let event: CalendarEvent;

	// TODO: change to correct timezone
	$: fromHour = event.from.toZonedDateTimeISO('Europe/Brussels').hour;
	$: toHour = event.to.toZonedDateTimeISO('Europe/Brussels').hour;
</script>

<Button focused on:click>
	<div class="flex justify-between items-end mb-2">
		<span class="text-lg text-bol">{event.title}</span>
		<span class="text-sm">{fromHour}:00-{toHour}:00</span>
	</div>
	<div class="text-sm line-clamp-3">
		{event.description} Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores alias eum
		obcaecati cupiditate! Aliquid tempora inventore ex deserunt. Ipsam repellat suscipit nemo ea, deleniti
		quas amet voluptate aliquam sunt maiores!
	</div>
</Button>
