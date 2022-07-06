import { Temporal } from '@js-temporal/polyfill';

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

const events: { [key: string]: CalendarEvent[] } = {
	'2022-07-06': [
		new CalendarEvent(
			Temporal.Instant.from('2022-07-06T08:00:00Z'),
			Temporal.Instant.from('2022-07-06T09:00:00Z'),
			'Svelte',
			'Svelte is a JavaScript framework for building user interfaces. It is designed to be fast, painless, and fun to use. Svelte is a progressive framework, which means that it is always up to date with the latest web technologies. Svelte is a framework that is designed to be used as a static site generator, or as a component library. Svelte is a framework that is designed to be used as a static site generator, or as a component library.'
		)
	]
};

export default events;
