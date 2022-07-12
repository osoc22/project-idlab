<script lang="ts">
	import type { CalendarEvent } from '$lib/types/calendarEvents';
	import Button from './Button.svelte';

	export let event: CalendarEvent;

	// TODO: change to correct timezone
	$: fromHour = event.from.toZonedDateTimeISO('Europe/Brussels').hour;
	$: toHour = event.to.toZonedDateTimeISO('Europe/Brussels').hour;
</script>

<Button --bg="aliceblue" on:click>
	<div class="header">{event.title} <span class="time">{fromHour}:00-{toHour}:00</span></div>
	<div class="description">{event.description}</div>
</Button>

<style>
	.header {
		font-weight: bold;
		font-size: 1.1rem;
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		gap: 0.5rem;
		margin-bottom: 0.5rem;
	}

	.time {
		font-size: 0.8rem;
		font-weight: normal;
	}

	.description {
		font-size: 0.9rem;
		max-height: 3.4rem;
		overflow: hidden;
		line-height: 1.1rem;
		cursor: pointer;
	}
</style>
