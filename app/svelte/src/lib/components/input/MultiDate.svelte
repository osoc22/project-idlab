<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { Temporal } from '@js-temporal/polyfill';
	import { Plus, Trash } from 'svelte-hero-icons';

	export let dates: Temporal.PlainDate[] = [];
	export let dateStrings: string[] = [];
	export let label: string = '';
	export let maxDates: number = 5;

	let newDateString: string = '';
	let lastDateStrings: string = '';

	function addNewDateString() {
		if (!newDateString) return;
		dateStrings = [...dateStrings, newDateString];
		dateStrings.sort();
		newDateString = '';
	}

	function removeDate(index: number) {
		dateStrings = [...dateStrings.slice(0, index), ...dateStrings.slice(index + 1)];
	}

	function updateDates() {
		if (dateStrings.toString() == lastDateStrings) return;

		dateStrings = dateStrings.filter((x) => x != '');

		dates = dateStrings.map((d) => Temporal.PlainDate.from(d));
		lastDateStrings = dateStrings.toString();
	}

	$: dateStrings && updateDates();
</script>

<div class="pb-3">
	<div class="mx-1 mb-px text-sm">
		{#if $$slots.label}
			<slot name="label" />
		{:else if label}
			{label}
		{/if}
	</div>
	<div class="dates flex flex-col gap-4">
		{#each dateStrings as _, index}
			<div class="flex gap-2">
				<input class="w-full" type="date" bind:value={dateStrings[index]} />

				<Button destructive icon={Trash} on:click={() => removeDate(index)} />
			</div>
		{/each}

		{#if maxDates == -1 || dateStrings.length < maxDates}
			<div class="newDate flex gap-2">
				<input class="w-full" type="date" bind:value={newDateString} />
				<Button icon={Plus} on:click={addNewDateString} />
			</div>
		{/if}
	</div>
</div>
