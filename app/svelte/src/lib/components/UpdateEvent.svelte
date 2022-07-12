<script lang="ts">
	import { editEvent } from '$lib/stores/eventStore';
	import type { CalendarEvent } from '$lib/types/calendarEvents';
	import { Temporal } from '@js-temporal/polyfill';
	import Input from './input/Input.svelte';

	let calendarEvent = $editEvent.event;

	// Convert Temporal date to datetime-local string
	function toDatetimeString(date: Temporal.Instant): string {
		const d = new Date(date.toString() || '');
		return `${d.toLocaleDateString().split('/').reverse().join('-')} ${d.toLocaleTimeString()}`;
	}

	// Convert javascrip Date object to temporal date
	function toTemporalInstant(date: Date): Temporal.Instant {
		const dateMilliseconds = date.getTime();

		return Temporal.Instant.fromEpochMilliseconds(dateMilliseconds);
	}

	// Set calendarEvent[key] to value
	function setCalendarValue(event: Event, key: 'from' | 'to'): void {
		if (!calendarEvent) return;

		const v = (event.target as HTMLInputElement).value;

		calendarEvent[key] = toTemporalInstant(new Date(v));
	}

	const setFromCalendarValue = (e: Event) => setCalendarValue(e, 'from');
	const setToCalendarValue = (e: Event) => setCalendarValue(e, 'to');

	function submitEvent(callback: (event: CalendarEvent) => void) {
		console.log('SUBMIT');

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

		<label for="datetime-from">
			Date time from:
			<input
				id="datetime-from"
				type="datetime-local"
				value={toDatetimeString(calendarEvent.from)}
				on:change={setFromCalendarValue}
			/>
		</label>
		<br />

		<label for="datetime-to">
			Date time to:
			<input
				id="datetime-to"
				type="datetime-local"
				value={toDatetimeString(calendarEvent.to)}
				on:change={setToCalendarValue}
			/>
		</label>
		<br />

		<Input label="title" bind:value={calendarEvent.title} error={calendarEvent.title} />

		<Input label="description" bind:value={calendarEvent.description} />

		<div class="flex gap-2 justify-end">
			<slot submit={submitEvent} />
		</div>
	</form>
{/if}

<style>
	input {
		display: block;
	}
</style>
