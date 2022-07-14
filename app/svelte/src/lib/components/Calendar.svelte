<script lang="ts">
	import { Temporal, Intl } from '@js-temporal/polyfill';

	import Button from '$lib/components/Button.svelte';
	import Event from '$lib/components/Event.svelte';
	import UpdateEvent from '$lib/components/UpdateEvent.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Weather from '$lib/components/Weather.svelte';

	import { calendarEvents, editEvent } from '$lib/stores/eventStore';

	export let startOfWeek: Temporal.PlainDate;
	const today = Temporal.Now.plainDateISO();

	const dayOfWeekString = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
	let week: Temporal.PlainDate[] = [];

	$: {
		startOfWeek && (week = dayOfWeekString.map((_, index) => startOfWeek.add({ days: index })));
	}
</script>

<div class="m-4 flex gap-3 container mx-auto">
	{#each week as day}
		<div class="grow max-w-xs">
			<!-- Date title with name of day (i.e Mon), the date as [dd::MM:YYYY] and a plus button to add a new event -->
			<div class="py-2" class:today={day.equals(today)}>
				<span class="font-lg">{dayOfWeekString[day.dayOfWeek - 1]}</span>
				{Intl.DateTimeFormat('gb-GB').format(day)}
			</div>

			<div class="flex flex-col gap-4 my-4">
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
			<Button filled destructive on:click={() => submit(calendarEvents.deleteEvent)}>
				Delete Event
			</Button>
			<Button filled focused on:click={() => submit(calendarEvents.updateEvent)}>
				Update Event
			</Button>
		{:else}
			<Button filled destructive on:click={editEvent.reset}>Cancel</Button>
			<Button filled focused on:click={() => submit(calendarEvents.addEvent)}>Create Event</Button>
		{/if}
	</UpdateEvent>
</Modal>

<style lang="postcss">
	.today {
		@apply font-bold border-b-2 text-blue-900 border-blue-900;
	}
</style>
