import { Temporal } from '@js-temporal/polyfill';

/**
 * TODO: place in util folder
 * Generate a random id
 * @returns Random uuid
 */
function uuid() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		const r = (Math.random() * 16) | 0,
			v = c == 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}

export class CalendarEvent {
	id: string = uuid();
	from: Temporal.Instant;
	to: Temporal.Instant;
	title: string;
	description: string;

	constructor(from: Temporal.Instant, to: Temporal.Instant, title: string, description: string) {
		this.from = from;
		this.to = to;
		this.title = title;
		this.description = description;
	}

	static new(startTime?: Temporal.Instant) {
		const start = startTime || Temporal.Now.instant();
		return new CalendarEvent(start, start.add({ hours: 1 }), '', '');
	}

	equals(other: CalendarEvent) {
		return this.id === other.id;
	}
}
