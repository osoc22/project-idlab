<script lang="ts">
	export let filled = false;
</script>

<div class="rounded-full p-2 h-min flex gap-4 items-center cursor-pointer" class:filled on:click>
	{#if $$slots.icon}
		<slot name="icon" />
	{/if}

	<slot />
</div>

<style lang="postcss">
	.filled {
		@apply bg-slate-300 hover:bg-slate-500 transition-colors;
	}
</style>
