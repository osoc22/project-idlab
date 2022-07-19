import { UnplannedActivity, PlannedActivity, type Activity } from '$lib/types/calendarEvents';
import { derived, writable } from 'svelte/store';

function createActivityStore<T extends Activity>() {
	const { subscribe, set, update } = writable<T[]>([]);

	return {
		subscribe,
		add: (event: T) =>
			update((es) => {
				es.push(event);

				return es;
			}),
		deleteActivity: (activity: T) => update((as) => as.filter((act) => !act.equals(activity))),
		updateActivity: (activity: T) =>
			update((as) => as.map((act) => (act == activity ? activity : act))),
		reset: () => set([])
	};
}

// Store for all upcomming activities
export const plannedActivities = createActivityStore<PlannedActivity>();
export const activitiesPerDay = derived(plannedActivities, ($calendarEvents) => {
	return $calendarEvents.reduce((acc, ev) => {
		const dateString = ev.date.toString();
		if (dateString in acc) {
			acc[dateString].push(ev);
		} else {
			acc[dateString] = [ev];
		}
		return acc;
	}, {} as { [key: string]: PlannedActivity[] });
});

export const unplannedActivities = createActivityStore<UnplannedActivity>();

type ModifyActivity<T extends Activity> = { editMode: boolean; activity: T };

function createModifyActivityStore<T extends Activity>(newActivity: () => T) {
	const { subscribe, set } = writable<ModifyActivity<T> | undefined>();

	return {
		subscribe,
		set,
		edit: (activity: T) => {
			set({
				editMode: true,
				activity
			});
		},
		new: () => {
			set({
				editMode: false,
				activity: newActivity()
			});
		},
		reset: () => set(undefined)
	};
}

export const modifyUnplannedActivity = createModifyActivityStore(UnplannedActivity.new);
export const modifyPlannedActivity = createModifyActivityStore(PlannedActivity.new);
