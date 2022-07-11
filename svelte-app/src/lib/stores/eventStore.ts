import { dev } from '$app/env';
import events from '$lib/hardcoded/events';
import { CalendarEvent } from '$lib/types/calendarEvents';
import { Temporal } from '@js-temporal/polyfill';
import { writable } from 'svelte/store';

function createEvents() {
	const { subscribe, set, update } = writable<{ [key: string]: CalendarEvent[] }>(events);

	return {
		subscribe,
		add: (event: CalendarEvent) =>
			update((es) => {
				// Only take the date of the event - not the time
				const eventDateString = event.from.toString().split('T')[0];

				if (eventDateString in es) {
					es[eventDateString].push(event);
				} else {
					es[eventDateString] = [event];
				}

				return es;
			}),
		reset: () => set({})
	};
}

export const calendarEvents = createEvents();

// IF Dev mode, console.log the store
if (dev) {
	const start = Temporal.Now.instant();

	const testEvent: CalendarEvent = new CalendarEvent(
		start,
		start.add({ hours: 1 }),
		'Test',
		'Test'
	);
	calendarEvents.add(testEvent);
}
