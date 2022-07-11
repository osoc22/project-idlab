import type { Temporal } from '@js-temporal/polyfill';

export class CalendarEvent {
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
}
