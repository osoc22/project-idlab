<script lang="ts">
	import { Icon, type IconSource } from 'svelte-hero-icons';

	interface Toggle {
		title: string;
		icon?: IconSource;
		id?: string;
	}

	export let options: Toggle[] = [];
	export let value: string = options[0].title;
	export let label = '';
	export let grow = false;

	const toggle = (option: Toggle) => (value = option.title);
</script>

<div class="my-4 block box-border">
	<div class="mx-1 mb-px text-sm">
		{#if $$slots.label}
			<slot name="label" />
		{:else if label}
			{label}
		{/if}
	</div>
	<div class="flex gap-2">
		{#each options as option}
			<div
				on:click={() => toggle(option)}
				class:active={value == option.title}
				class=" px-3 py-2 rounded bg-blue-50 text-blue-700 flex flex-col items-center justify-center"
				class:grow
			>
				{#if option.icon}
					<Icon src={option.icon} size="16" />
				{/if}
				<div class:text-sm={option.icon}>{option.title}</div>
			</div>
		{/each}
	</div>
</div>

<style lang="postcss">
	.active {
		@apply bg-blue-700 text-blue-100;
	}
</style>
