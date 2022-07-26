import { UnplannedActivity, PlannedActivity, TIME_ZONE } from '$lib/types/calendarEvents';
import { Temporal } from '@js-temporal/polyfill';
import { derived, writable } from 'svelte/store';
import {
	saveNewEvent,
	updateSavedEvent,
	schema,
	thingIdFromUrl,
	removeSavedEvent,
	eventUrl
} from '$lib/utils/solidInterface';

function createActivityStore<T extends PlannedActivity | UnplannedActivity>() {
	const { subscribe, set, update } = writable<T[]>([]);

	return {
		subscribe,
		set,
		add: async (
			activity: T,
			date?: Temporal.PlainDate,
			from?: Temporal.PlainTime,
			to?: Temporal.PlainTime
		) => {
			// Check if event is Planned or Unplanned
			// (because {PlannedActivity} has no "dates" in event object)
			if ('dates' in activity) {
				date = date ?? activity.dates[0];
			} else {
				date = date ?? activity.date;
			}

			if ('times' in activity && activity.times.length) {
				from = from ?? activity.times[0].from;
				to = to ?? activity.times[0].to;
			} else if ('time' in activity) {
				from = from ?? activity.time?.from;
				to = to ?? activity.time?.to;
			}

			// send event to solid
			if (date && from && to) {
				const start = new Date(date.toString() + 'T' + from.toString({ smallestUnit: 'second' }));
				const end = new Date(date.toString() + 'T' + to.toString({ smallestUnit: 'second' }));

				console.log(start, end);

				const newlySavedEvent = await saveNewEvent(
					activity.title,
					start,
					end,
					activity.location,
					activity.actitityType
				);
				console.log(newlySavedEvent);
				console.log(eventUrl(newlySavedEvent));
				// This is to circumvent a specific bug, see @thingUrl in solidInterface
				activity.url = eventUrl(newlySavedEvent);
			}

			update((es) => [...es, activity]);
		},
		deleteActivity: (activity: T) => {
			removeSavedEvent(thingIdFromUrl(activity.url));

			update((as) => as.filter((act) => !act.equals(activity)));
		},
		updateActivity: (activity: T) => {
			if (!schema.event) return;

			const date = 'dates' in activity ? activity.dates[0] : activity.date;
			const time = 'times' in activity ? activity.times[0] : activity.time;

			let start: Date | null = null;
			let end: Date | null = null;
			if (time != undefined) {
				start = new Date(date.toString() + 'T' + time.from.toString({ smallestUnit: 'second' }));
				end = new Date(date.toString() + 'T' + time.to.toString({ smallestUnit: 'second' }));
			}

			console.log(activity);

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const data: Partial<{ [key: string]: any }> = {};
			if (start) {
				data[schema.event.startDate] = start.toString();
			}
			if (end) {
				data[schema.event.endDate] = end.toString();
			}
			if (activity.title) {
				data[schema.event.about] = activity.title;
			}
			if (activity.location) {
				data[schema.event.location] = activity.location;
			}
			if (activity.actitityType) {
				data[schema.event.activityType] = activity.actitityType;
			}
			if (activity.notifyOnWeather) {
				data[schema.event.notifyOnWeather] = Array.from(activity.notifyOnWeather).join(',');
			}

			console.log(data);

			console.log(activity.url);

			const id = thingIdFromUrl(activity.url);
			console.log(id);

			updateSavedEvent(id, data);

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

type ModifyActivity<T extends UnplannedActivity | PlannedActivity> = {
	editMode: boolean;
	activity: T;
};

function createModifyActivityStore<T extends UnplannedActivity | PlannedActivity>(
	newActivity: () => T
) {
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
