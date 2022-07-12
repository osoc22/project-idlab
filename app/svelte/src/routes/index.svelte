<script lang="ts">
	import { onMount } from 'svelte';
	import { Temporal } from '@js-temporal/polyfill';

	import { Icon, ArrowRight, ArrowLeft } from 'svelte-hero-icons';

	import Button from '$lib/components/Button.svelte';
	import Calendar from '$lib/components/Calendar.svelte';
	import Profile from '$lib/components/Profile.svelte';
	import RoundButton from '$lib/components/RoundButton.svelte';

	const today = Temporal.Now.plainDateISO();
	let startOfWeek: Temporal.PlainDate;

	function gotoToday() {
		startOfWeek = today.subtract({ days: today.dayOfWeek - 1 });
		return startOfWeek;
	}

	onMount(() => {
		gotoToday();
	});
</script>

<div class="flex py-5 px-4 justify-between items-center gap-4">
	<h1 class="text-3xl font-bold underline">Your calendar</h1>

	<RoundButton filled on:click={() => (startOfWeek = startOfWeek.subtract({ weeks: 1 }))}>
		<Icon src={ArrowLeft} class="cursor-pointer" size="16" />
	</RoundButton>
	<RoundButton filled on:click={() => (startOfWeek = startOfWeek.add({ weeks: 1 }))}>
		<Icon src={ArrowRight} class="cursor-pointer" size="16" />
	</RoundButton>

	<div class="m-auto" />

	<Button>+ Create new event</Button>
	<Profile firstname="Abel" lastname="de Bruijn" />
</div>

<Calendar {startOfWeek} />
