import { PlannedActivity, UpcommingActivity, type Activity } from '$lib/types/calendarEvents';
import { derived, writable } from 'svelte/store';

function createActivityStore<T extends Activity>() {
	// Structure of events: {[date]: CalendarEvent[]}
	// TODO: fetch real events from server
	const { subscribe, set, update } = writable<T[]>([]);

	return {
		subscribe,
		add: (event: T) =>
			update((es) => {
				es.push(event);

				return es;
			}),
		deleteEvent: (activity: T) => update((as) => as.filter((act) => !act.equals(activity))),
		updateEvent: (activity: T) =>
			update((as) => as.map((act) => (act == activity ? activity : act))),
		reset: () => set([])
	};
}

// Store for all upcomming activities
export const upcommingActivites = createActivityStore<UpcommingActivity>();
export const activitiesPerDay = derived(upcommingActivites, ($calendarEvents) => {
	return $calendarEvents.reduce((acc, ev) => {
		const dateString = ev.date.toString();
		if (dateString in acc) {
			acc[dateString].push(ev);
		} else {
			acc[dateString] = [ev];
		}
		return acc;
	}, {} as { [key: string]: UpcommingActivity[] });
});

export const pastActivities = createActivityStore<UpcommingActivity>();
export const plannedActivities = createActivityStore<PlannedActivity>();

type ModifyActivity = { editMode: boolean; activity: PlannedActivity };

function createPlannedActivityStore() {
	const { subscribe, set } = writable<ModifyActivity | undefined>();

	return {
		subscribe,
		edit: (activity: PlannedActivity) => {
			set({
				editMode: true,
				activity
			});
		},
		new: () => {
			set({
				editMode: false,
				activity: PlannedActivity.new()
			});
		},
		reset: () => set(undefined)
	};
}

export const modifyPlannedActivity = createPlannedActivityStore();
