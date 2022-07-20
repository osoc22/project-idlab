<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';

	import { onMount } from 'svelte';
	import user from '$lib/stores/userStore';

	import { Temporal } from '@js-temporal/polyfill';
	import { Icon, ArrowRight, ArrowLeft, Plus, TrendingDown } from 'svelte-hero-icons';

	//import { editEvent } from '$lib/stores/eventStore';

	import Button from '$lib/components/Button.svelte';
	import Calendar from '$lib/components/Calendar.svelte';
	import Profile from '$lib/components/Profile.svelte';
	import RoundButton from '$lib/components/RoundButton.svelte';

	import { schema, tester } from '$lib/utils/solidInterface';
	window.tester = tester;

	const today = Temporal.Now.plainDateISO();
	let startOfWeek: Temporal.PlainDate;


	function gotoToday() {
		startOfWeek = today.subtract({ days: today.dayOfWeek - 1 });
		return startOfWeek;
	}

  onMount(() => {
		// If a user is logged in, redirect to the calendar page.
    //gotoToday();
		if ($user.userSession.isLoggedIn) {
			goto(base + '/upcomming');
		}
	});


</script>
