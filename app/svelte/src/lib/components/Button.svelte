<script lang="ts">
	import { type IconSource, Icon } from 'svelte-hero-icons';

	export let filled = false;
	export let focused = false;
	export let destructive = false;

	export let icon: IconSource | undefined = undefined;
</script>

<div
	class="rounded-md py-2 px-4 cursor-pointer bg-slate-100 hover:bg-slate-300 transition-colors flex items-center gap-2 text-center"
	class:filled
	class:focused
	class:destructive
	on:click
>
	{#if $$slots.icon}
		<slot name="icon" />
	{:else if icon}
		<Icon src={icon} size="16" />
	{/if}

	{#if $$slots.default}
		<div class="relative">
			<slot />
		</div>
	{/if}
</div>

<style lang="postcss">
	.filled {
		@apply bg-slate-300 text-slate-900 hover:bg-slate-400;
	}

	.focused {
		@apply bg-green-200 text-green-900 hover:bg-green-300;
	}

	.destructive {
		@apply bg-red-200 text-red-900 hover:bg-red-300;
	}
</style>
