<script lang="ts">
	import { Temporal, Intl } from '@js-temporal/polyfill';

	import Button from '$lib/components/Button.svelte';
	import Event from '$lib/components/Event.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Weather from '$lib/components/Weather.svelte';

	import { calendarEvents } from '$lib/stores/eventStore';
	import type { CalendarEvent } from '$lib/types/calendarEvents';

	const today = Temporal.Now.plainDateISO();
	const dayOfWeekString = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
	let week: Temporal.PlainDate[] = [];

	let newEventVisible = false;
	let editEvent: CalendarEvent;

	for (let i = 1 - today.dayOfWeek; i <= 7 - today.dayOfWeek; i++) {
		week.push(today.add({ days: i }));
	}
</script>

<div class="calendar">
	{#each week as day}
		<div class="day">
			<!-- Date title with name of day (i.e Mon), the date as [dd::MM:YYYY] and a plus button to add a new event -->
			<div class="date" class:today={day.equals(today)}>
				<span class="dateOfWeekString">{dayOfWeekString[day.dayOfWeek - 1]}</span>
				{Intl.DateTimeFormat('gb-GB').format(day)}
			</div>

			<div class="events">
				{#if day.until(today).days <= 0}
					<Weather {day} />
				{/if}

				{#if day.toString() in $calendarEvents}
					{#each $calendarEvents[day.toString()] as event}
						<Event {event} />
					{/each}
				{:else}
					<Button filled>Create event</Button>
				{/if}
			</div>
		</div>
	{/each}
</div>

{#if newEventVisible}
	<Modal><h3>TODO</h3></Modal>
{/if}

{#if editEvent}
	<Modal><h3>TODO</h3></Modal>
{/if}

<style>
	.calendar {
		margin: 1rem 2rem;
		width: calc(100% - 8rem);
		display: flex;
		gap: 1rem;
		padding-inline: 2rem;
	}

	.day {
		flex-grow: 1;
		max-width: calc(100% / 5);
	}

	.date {
		padding-block: 0.5rem;
	}

	.today {
		font-weight: bold;
		border-bottom: 2px solid black;
	}

	.dateOfWeekString {
		font-size: 1.2rem;
	}

	/* EVENTS */
	.events {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-block: 1rem;
	}
</style>
