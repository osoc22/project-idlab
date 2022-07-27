<script lang="ts">
	import { Icon, type IconSource } from 'svelte-hero-icons';

	export let filled = false;
	export let icon: IconSource | undefined = undefined;
</script>

<div
	class="rounded-full p-2 h-min flex gap-4 items-center cursor-pointer hover:bg-slate-200 transition-colors"
	class:filled
	on:click
>
	{#if $$slots.icon}
		<slot name="icon" />
	{:else if icon}
		<Icon src={icon} size="16" />
	{/if}

	<slot />
</div>

<style lang="postcss">
	.filled {
		@apply bg-slate-300 text-slate-900 hover:bg-slate-400;
	}
</style>
