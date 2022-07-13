<script lang="ts">
	import uuid from '$lib/utils/uuid';

	export let label = '';
	export let placeholder = '';
	export let error = '';
	export let value = '';
	export let type = 'text';

	let id = uuid();
</script>

<label class="my-4 block" for={id}>
	<div class="mx-1 mb-px text-sm capitalize">
		{#if $$slots.label}
			<slot name="label" />
		{:else if label}
			{label}
		{/if}
	</div>

	{#if type == 'date'}
		<input
			{id}
			class="rounded-md p-2 w-full bg-slate-100 hover:ring transition-all"
			class:ring={error}
			class:ring-red-500={error}
			type="date"
			placeholder={placeholder || label}
			bind:value
			on:change
		/>
	{:else if type == 'time'}
		<input
			{id}
			class="rounded-md p-2 w-full bg-slate-500 hover:ring transition-all"
			class:ring={error}
			class:ring-red-500={error}
			type="time"
			placeholder={placeholder || label}
			bind:value
			on:change
		/>
	{:else}
		<input
			{id}
			class="rounded-md p-2 w-full bg-slate-100 hover:ring transition-all"
			class:ring={error}
			class:ring-red-500={error}
			type="text"
			placeholder={placeholder || label}
			bind:value
		/>
	{/if}

	<div class="text-sm h-2 text-red-700 " class:opacity-0={!error}>{error}</div>
</label>
