<script>
	import { Icon, Plus, Calendar } from 'svelte-hero-icons';

	import { editEvent } from '$lib/stores/eventStore';

	import Profile from '$lib/components/Profile.svelte';
	import Button from '$lib/components/Button.svelte';

	import { base } from '$app/paths';
	import { page } from '$app/stores';

	const navigationLinks = [
		{ title: 'Planning view', url: ['planning', ''], icon: Calendar },
		{ title: 'Upcomming activities', url: ['upcomming'], icon: Calendar },
		{ title: 'Past activities', url: ['past'], icon: Calendar }
	];
</script>

<div class="flex">
	<!-- Navigation Bar -->
	<aside class="w-64 p-4 border-r-2 border-slate-200 h-[100vh]">
		<h1 class="text-3xl font-bold border-b-2 border-green-700 text-green-700 mb-4">PodPlanner</h1>

		<div class="flex flex-col gap-2">
			{#each navigationLinks as navigationLink}
				<a
					href={base + '/' + navigationLink.url[0]}
					class="flex flex-row items-center justify-start px-2 gap-3"
					class:active={navigationLink.url.includes($page.routeId || 'upcomming')}
				>
					<Icon src={navigationLink.icon} size="16" />
					{navigationLink.title}
				</a>
			{/each}
		</div>
	</aside>

	<!-- Main Content -->
	<main class="grow p-5">
		<div class=" flex gap-4 justify-end ">
			<Button on:click={editEvent.new}>
				<Icon slot="icon" src={Plus} size="16" />
				Create new event
			</Button>

			<Profile firstname="Abel" lastname="de Bruijn" />
		</div>

		<slot />
	</main>
</div>

<style lang="postcss">
	.active {
		@apply text-green-500 border-l-2 border-green-700;
	}
</style>
