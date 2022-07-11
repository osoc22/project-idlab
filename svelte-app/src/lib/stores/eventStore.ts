import events from '$lib/hardcoded/events';
import type { CalendarEvent } from '$lib/types/calendarEvents';
import { writable } from 'svelte/store';

function createEvents() {
	const { subscribe, set, update } = writable<{ [key: string]: CalendarEvent[] }>(events);

	return {
		subscribe,
		add: (event: CalendarEvent) =>
			update((es) => {
				// TODO - Test this it will probably fail
				const eventDateString = event.from.toString();

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
