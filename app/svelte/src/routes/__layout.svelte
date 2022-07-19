<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { Temporal } from '@js-temporal/polyfill';
	import { getDefaultSession } from '@inrupt/solid-client-authn-browser';

	import Login from '$lib/components/Login.svelte';
	import NavigationBar from '$lib/components/NavigationBar.svelte';

	import { PlannedActivity, TIME_ZONE, UnplannedActivity } from '$lib/types/calendarEvents';
	import { unplannedActivities, plannedActivities } from '$lib/stores/eventStore';

	const d1 = Temporal.Now.plainDateISO(TIME_ZONE);
	const d2 = d1.add({ days: 1 });
	const d3 = d1.add({ days: 2 });

	const t = Temporal.Now.plainTimeISO(TIME_ZONE);
	const t1 = { from: t, to: t.add({ minutes: 30 }) };
	const t2 = { from: t.add({ minutes: 90 }), to: t.add({ minutes: 180 }) };

	function setupUnplannedActivities() {
		const e1 = new UnplannedActivity('Test1', 'Work', new Set(['Windy', 'Rain']), [d1, d2]);
		const e2 = new UnplannedActivity(
			'Test2',
			'Fun',
			new Set(['Windy', 'Rain']),
			[d1, d3],
			[t1, t2]
		);

		unplannedActivities.add(e1);
		unplannedActivities.add(e2);
	}

	function setupPlannedActivities() {
		const e1 = new PlannedActivity('Test1', 'Work', new Set(['Windy', 'Rain']), d2);
		const e2 = new PlannedActivity('Test2', 'Fun', new Set(['Windy', 'Rain']), d1, t1);

		plannedActivities.add(e1);
		plannedActivities.add(e2);
	}

	onMount(() => {
		// TODO: fill with real server data
		if (!$unplannedActivities.length) setupUnplannedActivities();
		if (!$plannedActivities.length) setupPlannedActivities();
	});
</script>

{#if getDefaultSession()?.info.isLoggedIn || true}
	<NavigationBar>
		<slot />
	</NavigationBar>
{:else}
	<Login />
{/if}
