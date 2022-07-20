<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	export let visible = false;

	const dispatch = createEventDispatcher();

	function closeModal() {
		dispatch('close');
		visible = false;
	}
</script>

{#if visible}
	<div
		class="fixed top-0 left-0 w-full h-[100%] bg-slate-900/30 z-10 cursor-pointer"
		on:click={closeModal}
	>
		<div
			class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl bg-white z-20 p-4 rounded-lg"
			on:click|stopPropagation
		>
			<slot />
		</div>
	</div>
{/if}
