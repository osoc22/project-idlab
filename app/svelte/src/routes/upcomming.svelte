<script lang="ts">
	import { onMount } from 'svelte';
	import { Temporal } from '@js-temporal/polyfill';

	import Calendar from '$lib/components/Calendar.svelte';

	const today = Temporal.Now.plainDateISO();
	let startOfWeek: Temporal.PlainDate;

	function gotoToday() {
		startOfWeek = today.subtract({ days: today.dayOfWeek - 1 });
		return startOfWeek;
	}

	// On load
	onMount(async () => {
		gotoToday();
	});
</script>

<Calendar {startOfWeek} />
