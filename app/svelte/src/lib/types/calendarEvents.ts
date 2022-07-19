import { Temporal } from '@js-temporal/polyfill';
import Identifiable from '$lib/types/identifiable';

export const TIME_ZONE = 'Europe/Brussels';

type ActivityType = 'Work' | 'Food' | 'Fun' | 'Workout' | 'Relax';
type WeatherType = 'Sun' | 'Rain' | 'Cloudy' | 'Windy';
type TimeFromTo = { from: Temporal.PlainTime; to: Temporal.PlainTime };

export interface Activity extends Identifiable {
	title: string;

	actitityType: ActivityType;
	notifyOnWeather: Set<WeatherType>;

	get isAllDay(): boolean;
	set isAllDay(value: boolean);
	setToAllDay(): void;
}

export class UnplannedActivity extends Identifiable implements Activity {
	title: string;
	actitityType: ActivityType;
	notifyOnWeather: Set<WeatherType>;

	dates: Temporal.PlainDate[];
	times: TimeFromTo[];

	constructor(
		title: string,
		actitityType: ActivityType,
		notifyOnWeather: Set<WeatherType>,
		dates: Temporal.PlainDate[],
		times: TimeFromTo[] = []
	) {
		super();
		this.title = title;
		this.actitityType = actitityType;
		this.notifyOnWeather = notifyOnWeather;
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
		return new UnplannedActivity('', 'Work', new Set(['Sun']), dates, times);
	}
}

export class PlannedActivity extends Identifiable implements Activity {
	title: string;
	actitityType: ActivityType;
	notifyOnWeather: Set<WeatherType>;

	date: Temporal.PlainDate;
	time?: TimeFromTo;

	constructor(
		title: string,
		actitityType: ActivityType,
		notifyOnWeather: Set<WeatherType>,
		date: Temporal.PlainDate,
		time?: TimeFromTo
	) {
		super();
		this.title = title;
		this.actitityType = actitityType;
		this.notifyOnWeather = notifyOnWeather;
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
		return new PlannedActivity('', 'Work', new Set(['Sun']), date, time);
	}
}
