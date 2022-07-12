<script lang="ts">
	export let filled = false;
	export let focused = false;
	export let destructive = false;
</script>

<div
	class="rounded-md py-2 px-4 cursor-pointer bg-slate-100 hover:bg-slate-300 transition-colors"
	class:filled
	class:focused
	class:destructive
	on:click
>
	<slot />
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
