<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { Plus, Trash } from 'svelte-hero-icons';

	// export let dates: Temporal.PlainDate[] = [];
	export let dateStrings: string[] = [];
	export let label: string = '';

	let newDateString: string = '';

	function addNewDateString() {
		if (!newDateString) return;
		dateStrings = [...dateStrings, newDateString];
		newDateString = '';

		// TODO: convert string to temporal
	}

	function removeDate(index: number) {
		dateStrings = [...dateStrings.slice(0, index), ...dateStrings.slice(index + 1)];
	}

	function updateDates() {
		dateStrings = dateStrings.filter((x) => x != '');
	}

	$: dateStrings && updateDates();
</script>

<div>
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

		<div class="newDate flex gap-2">
			<input class="w-full" type="date" bind:value={newDateString} />
			<Button icon={Plus} on:click={addNewDateString} />
		</div>
	</div>
</div>
