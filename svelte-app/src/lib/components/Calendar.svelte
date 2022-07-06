<script lang="ts">
	import { Temporal, Intl } from '@js-temporal/polyfill';

	import Weather from './Weather.svelte';

	const today = Temporal.Now.plainDateISO();
	const dayOfWeekString = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
	let week: Temporal.PlainDate[] = [];

	for (let i = 1 - today.dayOfWeek; i <= 7 - today.dayOfWeek; i++) {
		week.push(today.add({ days: i }));
	}
</script>

<div class="calendar">
	{#each week as day}
		<div class="day">
			<div class="date" class:today={day.equals(today)}>
				<span class="dateOfWeekString">{dayOfWeekString[day.dayOfWeek - 1]}</span>
				{Intl.DateTimeFormat('gb-GB').format(day)}
			</div>

			<div class="events">
				{#if day.until(today).days <= 0}
					<Weather {day} />
				{/if}

				<!-- TODO add events or button to add event -->
				<div class="button newEvent">Create new event</div>
			</div>
		</div>
	{/each}
</div>

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

	/* New event */
	.button {
		background-color: #ccc;
		border-radius: 0.5rem;
		padding: 0.5rem 1rem;
		cursor: pointer;
		outline: 0 solid black;
		transition: outline 0.2s;
	}

	.button:hover {
		outline-offset: 2px;
		outline-width: 2px;
	}
</style>
