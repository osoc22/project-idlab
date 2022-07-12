import { dev } from '$app/env';
import events from '$lib/hardcoded/events';
import { CalendarEvent } from '$lib/types/calendarEvents';
import { Temporal } from '@js-temporal/polyfill';
import { derived, writable } from 'svelte/store';

function createEvents() {
	// Structure of events: {[date]: CalendarEvent[]}
	// TODO: fetch real events from server
	const { subscribe, set, update } = writable<{ [key: string]: CalendarEvent[] }>(events);

	return {
		subscribe,
		addEvent: (event: CalendarEvent) =>
			update((es) => {
				// Only take the date of the event - not the time
				const eventDateString = event.from.toString().split('T')[0];

				// Add event to the correct day
				if (eventDateString in es) {
					es[eventDateString].push(event);
				} else {
					es[eventDateString] = [event];
				}

				console.log({ ADDED: es });

				return es;
			}),
		deleteEvent: (event: CalendarEvent) => {
			update((es) => {
				for (const eventKeys of Object.keys(es)) {
					// Filter for all event that are not the same as the event to delete
					const remainingEvents = es[eventKeys].filter((e) => !e.equals(event));

					if (remainingEvents.length == es[eventKeys].length) {
						continue; // continue if no events were removed
					} else if (remainingEvents.length > 0) {
						// Set the remaining events for the date
						es[eventKeys] = remainingEvents;
					} else {
						// delete key if no events are left
						delete es[eventKeys];
					}
				}

				console.log({ DELETED: es });

				return es;
			});
		},
		updateEvent: (event: CalendarEvent) => {
			// Remove event to make sure it is not inserted on wrong day
			calendarEvents.deleteEvent(event);
			calendarEvents.addEvent(event);
		},
		reset: () => set({})
	};
}

export const calendarEvents = createEvents();

derived(calendarEvents, ($calendarEvents) => console.log($calendarEvents));

interface EditEvent {
	visible: boolean;
	editMode: boolean;
	event: CalendarEvent;
}

function creatEditEvent() {
	const { subscribe, set } = writable<EditEvent>({
		visible: false,
		editMode: false,
		event: CalendarEvent.new()
	});

	return {
		subscribe,
		edit: (event: CalendarEvent) => {
			set({
				visible: true,
				editMode: true,
				event
			});
		},
		new: () => {
			set({
				visible: true,
				editMode: false,
				event: new CalendarEvent(
					Temporal.Now.instant(),
					Temporal.Now.instant().add({ hours: 1 }),
					'',
					''
				)
			});
		},
		reset: () => set({ visible: false, editMode: false, event: CalendarEvent.new() })
	};
}

export const editEvent = creatEditEvent();

// IF Dev mode, console.log the store
if (dev) {
	const start = Temporal.Now.instant();

	const testEvent: CalendarEvent = new CalendarEvent(
		start,
		start.add({ hours: 1 }),
		'Test',
		'Test'
	);
	calendarEvents.addEvent(testEvent);
}
