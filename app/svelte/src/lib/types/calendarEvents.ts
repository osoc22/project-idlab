import { Temporal } from '@js-temporal/polyfill';
import Identifiable from '$lib/types/identifiable';
import {
	listThingsFromDataset,
	type SchemaEvent,
	parseEventThing
} from '$lib/utils/solidInterface';
import type { Thing } from '@inrupt/solid-client';
import { plannedActivities } from '$lib/stores/eventStore';

export const TIME_ZONE = 'Europe/Brussels';

type ActivityType = 'Work' | 'Food' | 'Fun' | 'Workout' | 'Relax';
type WeatherType = 'Sun' | 'Rain' | 'Cloudy' | 'Windy';
type TimeFromTo = { from: Temporal.PlainTime; to: Temporal.PlainTime };

export interface Activity extends Identifiable {
	title: string;

	actitityType: ActivityType;
	notifyOnWeather: Set<WeatherType>;
	location: string;

	get isAllDay(): boolean;
	set isAllDay(value: boolean);
	setToAllDay(): void;
}

export class UnplannedActivity extends Identifiable implements Activity {
	title: string;
	actitityType: ActivityType;
	notifyOnWeather: Set<WeatherType>;
	location: string;

	dates: Temporal.PlainDate[];
	times: TimeFromTo[];

	constructor(
		title: string,
		actitityType: ActivityType,
		notifyOnWeather: Set<WeatherType>,
		location: string,
		dates: Temporal.PlainDate[],
		times: TimeFromTo[] = []
	) {
		super();
		this.title = title;
		this.actitityType = actitityType;
		this.notifyOnWeather = notifyOnWeather;
		this.location = location;
		this.dates = dates;
		this.times = times;
	}

	/**
	 * If this activity is on the given date without a specified
	 */
	get isAllDay() {
		return this.times.length === 0;
	}

	set isAllDay(value: boolean) {
		if (value) {
			this.setToAllDay();
			return;
		}

		const from = Temporal.Now.plainTimeISO(TIME_ZONE);
		const to = Temporal.Now.plainTimeISO(TIME_ZONE);
		this.times = [{ from, to }];
	}

	setToAllDay() {
		this.times = [];
	}

	static new(dates: Temporal.PlainDate[] = [], times: TimeFromTo[] = []) {
		return new UnplannedActivity('', 'Work', new Set(['Sun']), 'Brussels', dates, times);
	}
}

/**
 * Planned activities are activites that are planned for a specific date.
 * These activities will be shown in the calendar. Or when it is in the past -> they will be shown in the past.
 */
export class PlannedActivity extends Identifiable implements Activity {
	url: string;
	title: string;
	actitityType: ActivityType;
	notifyOnWeather: Set<WeatherType>;
	location: string;

	date: Temporal.PlainDate;
	time?: TimeFromTo;

	constructor(
		url: string,
		title: string,
		actitityType: ActivityType,
		notifyOnWeather: Set<WeatherType>,
		location: string,
		date: Temporal.PlainDate,
		time?: TimeFromTo
	) {
		super();
		this.url = url;
		this.title = title;
		this.actitityType = actitityType;
		this.notifyOnWeather = notifyOnWeather;
		this.location = location;
		this.date = date;
		this.time = time;
	}

	get isAllDay() {
		return !this.time || !this.time.from || !this.time.to;
	}

	set isAllDay(value: boolean) {
		if (value) {
			this.setToAllDay();
			return;
		}

		const from = Temporal.Now.plainTimeISO(TIME_ZONE);
		const to = Temporal.Now.plainTimeISO(TIME_ZONE).add({ hours: 1 });
		this.time = { from, to };
	}

	setToAllDay() {
		this.time = undefined;
	}

	toZonedTime(event: Event, key: 'from' | 'to') {
		const timeString = (event.target as HTMLInputElement)?.value;
		if (!timeString) return;

		const [hour, minute] = timeString.split(':').map(parseInt);
		const time = Temporal.PlainTime.from({ hour, minute });

		// Set time | if not yet defined -> set it to the same time
		if (!this.time) {
			this.time =
				key == 'from'
					? { from: time, to: time.add({ hours: 1 }) }
					: { from: time.subtract({ hours: 1 }), to: time };
		} else {
			this.time[key] = Temporal.PlainTime.from({ hour, minute });
		}
	}

	setDate(event: Event) {
		const dateString = (event.target as HTMLInputElement)?.value;
		const dateMilliseconds = new Date(dateString).getTime();
		const dateInstant = Temporal.Instant.fromEpochMilliseconds(dateMilliseconds);
		const zonedDate = dateInstant.toZonedDateTimeISO(TIME_ZONE);

		this.date = zonedDate.toPlainDate();
	}

	setFromTime(event: Event) {
		this.toZonedTime(event, 'from');
	}

	setToTime(event: Event) {
		this.toZonedTime(event, 'to');
	}

	static new(date: Temporal.PlainDate = Temporal.Now.plainDateISO(TIME_ZONE), time?: TimeFromTo) {
		return new PlannedActivity('', 'Work', 'Sun', new Set(['Sun']), 'Brussels', date, time);
	}

	static fromSolid(schema: Partial<SchemaEvent>): PlannedActivity {
		const url = schema.url || new URL('');
		const title = schema.about || '';
		const actitityType = (schema.activityType || 'Work') as ActivityType;
		const notifyOnWeather = new Set(['Sun']) as Set<WeatherType>;
		const location = schema.location || '';

		let date: Temporal.PlainDate = Temporal.Now.plainDateISO(TIME_ZONE);

		if (schema.startDate) {
			const d = new Date(schema.startDate);
			date = new Temporal.PlainDate(d.getFullYear(), d.getMonth() + 1, d.getDate());
		}

		// If startDate is defined AND startDate IS endDate THEN event is all day
		if (schema.startDate && schema.endDate && schema.startDate != schema.endDate) {
			const t1 = new Date(schema.startDate);
			const t2 = new Date(schema.endDate);
			const from = new Temporal.PlainTime(t1.getHours(), t1.getMinutes(), t1.getSeconds());
			const to = new Temporal.PlainTime(t2.getHours(), t2.getMinutes(), t2.getSeconds());
			const time = { from, to };
			return new PlannedActivity(url, title, actitityType, notifyOnWeather, location, date, time);
		}

		return new PlannedActivity(url, title, actitityType, notifyOnWeather, location, date);
	}

	static async init() {
		// STEP 1: Get solid data
		const rdfDataset: Thing[] = await listThingsFromDataset('calendar', true);

		// STEP 2: normalise dataset
		const normDataset = rdfDataset.map(async (thing) => await parseEventThing(thing));
		const dataset: Partial<SchemaEvent>[] = await Promise.all(normDataset);

		// STEP 3: Convert to {PlannedActivity} $lib/types/calendarEvents.ts
		const calendarActivities = dataset.map((data) => PlannedActivity.fromSolid(data));

		// STEP 4: set data to store
		plannedActivities.set(calendarActivities);
	}
}
