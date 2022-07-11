<script lang="ts">
	import { Temporal, Intl } from '@js-temporal/polyfill';

	import Button from '$lib/components/Button.svelte';
	import Event from '$lib/components/Event.svelte';
	import UpdateEvent from '$lib/components/UpdateEvent.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Weather from '$lib/components/Weather.svelte';

	import { calendarEvents, editEvent } from '$lib/stores/eventStore';

	const today = Temporal.Now.plainDateISO();
	let startOfWeek = today.subtract({ days: today.dayOfWeek - 1 });

	console.log(startOfWeek);
	const dayOfWeekString = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
	let week: Temporal.PlainDate[] = [];

	$: {
		startOfWeek && (week = dayOfWeekString.map((_, index) => startOfWeek.add({ days: index })));
	}

	function gotoToday() {
		// TODO
	}
</script>

<Button filled on:click={() => (startOfWeek = startOfWeek.subtract({ weeks: 1 }))}>
	Go to last week
</Button>
<Button filled on:click={() => (startOfWeek = startOfWeek.add({ weeks: 1 }))}>
	Go to next week
</Button>

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
						<Event {event} on:click={() => editEvent.edit(event)} />
					{/each}
				{:else}
					<Button filled on:click={editEvent.new}>Create event</Button>
				{/if}
			</div>
		</div>
	{/each}
</div>

<Modal visible={$editEvent.visible} on:close={editEvent.reset}>
	<UpdateEvent let:submit>
		{#if $editEvent.editMode}
			<Button filled on:click={() => submit(calendarEvents.deleteEvent)}>Delete Event</Button>
			<Button filled on:click={() => submit(calendarEvents.updateEvent)}>Update Event</Button>
		{:else}
			<Button filled on:click={editEvent.reset}>Cancel</Button>
			<Button filled on:click={() => submit(calendarEvents.addEvent)}>Create Event</Button>
		{/if}
	</UpdateEvent>
</Modal>

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
