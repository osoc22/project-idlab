<script lang="ts">
	import { Temporal, Intl } from '@js-temporal/polyfill';

	import Weather from './Weather.svelte';

	const today = Temporal.Now.plainDateISO();
	let week: Temporal.PlainDate[] = [];

	for (let i = 1 - today.dayOfWeek; i <= 7 - today.dayOfWeek; i++) {
		week.push(today.add({ days: i }));
	}
</script>

<div class="calendar">
	{#each week as day}
		<div class="day">
			<div class="date" class:today={day.equals(today)}>
				{Intl.DateTimeFormat('gb-GB').format(day)}
			</div>

			<Weather on={day} />
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
</style>
