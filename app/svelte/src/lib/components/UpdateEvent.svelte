<script lang="ts">
	import { editEvent } from '$lib/stores/eventStore';
	import type { CalendarEvent } from '$lib/types/calendarEvents';
	import Input from './input/Input.svelte';

	let calendarEvent = $editEvent.event;

	function submitEvent(callback: (e: CalendarEvent) => void) {
		editEvent.reset(); // close modal

		callback(calendarEvent);
	}
</script>

{#if calendarEvent}
	<!-- TODO listen to form submit -->
	<form class="editEvent">
		<h3 class="text-xl border-b border-b-black/50 border-solid mb-4 pb-2">
			{$editEvent.editMode ? 'Edit' : 'Create'} event
		</h3>

		<Input
			type="date"
			label="date"
			value={calendarEvent.date.toString()}
			on:change={(e) => calendarEvent.setDate(e)}
		/>

		<Input
			type="time"
			label="from"
			value={calendarEvent.time.from.toString({ smallestUnit: 'minute' })}
			on:change={(e) => calendarEvent.setFromTime(e)}
		/>

		<Input
			type="time"
			label="to"
			value={calendarEvent.time.to.toString({ smallestUnit: 'minute' })}
			on:change={(e) => calendarEvent.setToTime(e)}
		/>

		<Input label="title" bind:value={calendarEvent.title} />

		<Input label="description" bind:value={calendarEvent.description} />

		<div class="flex gap-2 justify-end">
			<slot submit={submitEvent} />
		</div>
	</form>
{/if}
