import {
	UnplannedActivity,
	PlannedActivity,
	type Activity,
	TIME_ZONE
} from '$lib/types/calendarEvents';
import { Temporal } from '@js-temporal/polyfill';
import { derived, writable } from 'svelte/store';
import { saveNewEvent, updateSavedEvent, schema } from '$lib/utils/solidInterface';

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
			console.log(event)
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
			if (!schema.event) return;
			console.log(activity)

			/*
			let time = activity.time;
			let start;
			let end;
			if (time != undefined) {
				start = new Date(activity.date.toString() + 'T' + time.from.toString({ smallestUnit: 'second' })) ;
				end = new Date(activity.date.toString() + 'T' + time.to.toString({ smallestUnit: 'second' }));
			}
			else {
				start = null;
				end = null;
			}
			
			console.log(activity)


			let data = {
				[schema.event.startDate]: start,
				[schema.event.endDate]: end,
				[schema.event.about]: activity.about,
				[schema.event.location]: activity.location,
				[schema.event.activityType]: activity.actitityType
			};

			console.log(data);

			updateSavedEvent(activity.id, data);
			*/
		
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
