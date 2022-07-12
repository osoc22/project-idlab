<script lang="ts">
	export let label = '';
	export let placeholder = '';
	export let error = '';
	export let value = '';

	/**
	 * TODO: place in util folder
	 * Generate a random id
	 * @returns Random uuid
	 */
	function uuid() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			const r = (Math.random() * 16) | 0,
				v = c == 'x' ? r : (r & 0x3) | 0x8;
			return v.toString(16);
		});
	}

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

	<input
		{id}
		class="rounded-md p-2 w-full bg-slate-100 hover:ring transition-all"
		class:ring={error}
		class:ring-red-500={error}
		type="text"
		placeholder={placeholder || label}
		bind:value
	/>

	<div class="text-sm h-2 text-red-700 " class:opacity-0={!error}>{error}</div>
</label>
