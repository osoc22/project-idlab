import {
	UnplannedActivity,
	PlannedActivity,
	type Activity,
	TIME_ZONE
} from '$lib/types/calendarEvents';
import { Temporal } from '@js-temporal/polyfill';
import { derived, writable } from 'svelte/store';
import { saveNewEvent } from '$lib/utils/solidInterface';

function createActivityStore<T extends Activity>() {
	const { subscribe, set, update } = writable<T[]>([]);

	return {
		subscribe,
		set,
		add: async (
			event: T,
			date?: Temporal.PlainDate,
			from?: Temporal.PlainTime,
			to?: Temporal.PlainTime
		) => {
			// send event to solid
			if (date && from && to) {
				const start = new Date(date.toString() + 'T' + from.toString({ smallestUnit: 'second' }));
				const end = new Date(date.toString() + 'T' + to.toString({ smallestUnit: 'second' }));

				console.log(start, end);

				const savedEvent = await saveNewEvent(
					event.title,
					start,
					end,
					event.location,
					event.actitityType
				);
				console.log(savedEvent);
			}

			update((es) => [...es, event]);
		},
		deleteActivity: (activity: T) => update((as) => as.filter((act) => !act.equals(activity))),
		updateActivity: (activity: T) => {
			update((as) => as.map((act) => (act == activity ? activity : act)));
		},
		reset: () => set([])
	};
}

// Store for all planned activities
export const plannedActivities = createActivityStore<PlannedActivity>();
export const activitiesPerDay = derived(plannedActivities, ($activities) => {
	return $activities.reduce((acc, ev) => {
		const dateString = ev.date.toString();
		if (dateString in acc) {
			acc[dateString].push(ev);
		} else {
			acc[dateString] = [ev];
		}
		return acc;
	}, {} as { [key: string]: PlannedActivity[] });
});
export const pastActivities = derived(plannedActivities, ($activities) => {
	return $activities.filter(
		($activity) => Temporal.Now.plainDateISO(TIME_ZONE).until($activity.date).days <= 0
	);
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

export const modifyUnplannedActivity = createModifyActivityStore(() => UnplannedActivity.new());
export const modifyPlannedActivity = createModifyActivityStore(() => PlannedActivity.new());
