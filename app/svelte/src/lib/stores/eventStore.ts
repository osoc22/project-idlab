import { CalendarEvent } from '$lib/types/calendarEvents';
import { derived, writable } from 'svelte/store';

function createEvents() {
	// Structure of events: {[date]: CalendarEvent[]}
	// TODO: fetch real events from server
	const { subscribe, set, update } = writable<CalendarEvent[]>([]);

	return {
		subscribe,
		addEvent: (event: CalendarEvent) =>
			update((es) => {
				es.push(event);

				return es;
			}),
		deleteEvent: (event: CalendarEvent) => update((es) => es.filter((e) => !e.equals(event))),
		updateEvent: (event: CalendarEvent) => update((es) => es.map((e) => (e == event ? event : e))),
		reset: () => set([])
	};
}

export const calendarEvents = createEvents();
export const eventsPerDay = derived(calendarEvents, ($calendarEvents) => {
	return $calendarEvents.reduce((acc, ev) => {
		const dateString = ev.date.toString();
		if (dateString in acc) {
			acc[dateString].push(ev);
		} else {
			acc[dateString] = [ev];
		}
		return acc;
	}, {} as { [key: string]: CalendarEvent[] });
});

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
				event: CalendarEvent.new()
			});
		},
		reset: () => set({ visible: false, editMode: false, event: CalendarEvent.new() })
	};
}

export const editEvent = creatEditEvent();
