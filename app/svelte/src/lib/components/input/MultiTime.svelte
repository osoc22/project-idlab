<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { Temporal } from '@js-temporal/polyfill';
	import { Plus, Trash } from 'svelte-hero-icons';

	export let times: { from: Temporal.PlainTime; to: Temporal.PlainTime }[] = [];
	export let timeStrings: { from: string; to: string }[] = [];
	export let label: string = 'init';
	export let maxTimes: number = 5;

	let newTimeString: { from: string; to: string } = { from: '', to: '' };
	let lastTimeStrings: string = '';

	function addNewTimeString() {
		// Check if input is empty
		if (!newTimeString.from || !newTimeString.to) return;

		timeStrings = [newTimeString, ...timeStrings];

		// dateStrings.sort();
		newTimeString = { from: '', to: '' };
	}

	function removeTime(index: number) {
		timeStrings = [...timeStrings.slice(0, index), ...timeStrings.slice(index + 1)];
	}

	function updateTimes() {
		const newTimeStrings = JSON.stringify(timeStrings) ?? '';
		if (newTimeStrings == lastTimeStrings) return;

		timeStrings = timeStrings.filter((ts) => ts.from != '' || ts.to != '');
		lastTimeStrings = newTimeStrings;

		times = timeStrings.map((ts) => {
			const fromTime = Temporal.PlainTime.from(ts.from);
			const toTime = Temporal.PlainTime.from(ts.to);

			const timesSwapped = { from: toTime, to: fromTime };

			if (fromTime.until(toTime).hours < 0) return timesSwapped;
			if (fromTime.until(toTime).hours == 0 && fromTime.until(toTime).minutes < 0)
				return timesSwapped;

			return { from: fromTime, to: toTime };
		});
	}

	$: timeStrings && updateTimes();
</script>

<div>
	<div class="mx-1 mb-px text-sm">
		{#if $$slots.label}
			<slot name="label" />
		{:else if label}
			{label}
		{/if}
	</div>
	<div class="times flex flex-col gap-4">
		{#each timeStrings as _, index}
			<div class="flex gap-2">
				<input class="w-full" type="time" bind:value={timeStrings[index].from} />
				<input class="w-full" type="time" bind:value={timeStrings[index].to} />

				<Button destructive icon={Trash} on:click={() => removeTime(index)} />
			</div>
		{/each}

		{#if maxTimes == -1 || timeStrings.length < maxTimes}
			<div class="newTime flex gap-2">
				<input class="w-full" type="time" bind:value={newTimeString.from} />
				<input class="w-full" type="time" bind:value={newTimeString.to} />
				<Button icon={Plus} on:click={addNewTimeString} />
			</div>
		{/if}
	</div>
</div>
