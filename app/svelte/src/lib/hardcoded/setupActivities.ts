import { Temporal } from '@js-temporal/polyfill';
import { PlannedActivity, TIME_ZONE, UnplannedActivity } from '$lib/types/calendarEvents';

import { unplannedActivities, plannedActivities } from '$lib/stores/eventStore';
import { get } from 'svelte/store';

const d1 = Temporal.Now.plainDateISO(TIME_ZONE);
const d2 = d1.add({ days: 1 });
const d3 = d1.add({ days: 2 });

const t = Temporal.Now.plainTimeISO(TIME_ZONE);
const t1 = { from: t, to: t.add({ minutes: 30 }) };
const t2 = { from: t.add({ minutes: 90 }), to: t.add({ minutes: 180 }) };

function setupUnplannedActivities() {
	const e1 = new UnplannedActivity('Test1', 'Work', new Set(['Windy', 'Rain']),"Brussels", [d1, d2]);
	const e2 = new UnplannedActivity('Test2', 'Fun', new Set(['Windy', 'Rain']),"Brussels", [d1, d3], [t1, t2]);

	unplannedActivities.add(e1);
	unplannedActivities.add(e2);
}

function setupPlannedActivities() {
	const e1 = new PlannedActivity('Test1', 'Work', new Set(['Windy', 'Rain']), "Brussels", d2);
	const e2 = new PlannedActivity(
		'Test2',
		'Fun',
		new Set(['Windy', 'Rain']),
		"Brussels",
		d1.subtract({ days: 1 }),
		t1
	);

	plannedActivities.add(e1);
	plannedActivities.add(e2);
}

export default function setupActivities() {
	const $unplannedActivities = get(unplannedActivities);
	const $plannedActivities = get(plannedActivities);

	if (!$unplannedActivities.length) setupUnplannedActivities();
	if (!$plannedActivities.length) setupPlannedActivities();
}
