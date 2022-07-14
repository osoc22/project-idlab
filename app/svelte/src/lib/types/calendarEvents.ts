import { Temporal } from '@js-temporal/polyfill';
import UUID from '$lib/utils/uuid';
import Identifiable from '$lib/types/identifiable';

export const TIME_ZONE = 'Europe/Brussels';

export class CalendarEvent extends Identifiable {
	id: string = UUID();

	date: Temporal.PlainDate;
	time: { from: Temporal.PlainTime; to: Temporal.PlainTime };

	title: string;
	description: string;

	constructor(
		date: Temporal.PlainDate,
		time: { from: Temporal.PlainTime; to: Temporal.PlainTime },
		title: string,
		description: string
	) {
		super();
		this.date = date;
		this.time = time;
		this.title = title;
		this.description = description;
	}

	toZonedTime(event: Event, key: 'from' | 'to') {
		const timeString = (event.target as HTMLInputElement)?.value;
		if (!timeString) return;

		const [hour, minute] = timeString.split(':').map(parseInt);

		this.time[key] = Temporal.PlainTime.from({ hour, minute });
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

	static new(date?: Temporal.PlainDate, timeStart?: Temporal.PlainTime) {
		// Set date and time if they are not set -> use date/time now
		date = date ?? Temporal.Now.plainDateISO(TIME_ZONE);
		timeStart = timeStart ?? Temporal.Now.plainTimeISO(TIME_ZONE);

		const time = {
			from: timeStart,
			to: timeStart.add({ hours: 1 })
		};

		return new CalendarEvent(date, time, '', '');
	}
}
