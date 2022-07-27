<script>
	import { Icon, Plus, Calendar, ChevronLeft, Menu } from 'svelte-hero-icons';

	import { modifyPlannedActivity, modifyUnplannedActivity } from '$lib/stores/eventStore';

	import Button from '$lib/components/Button.svelte';
	import Profile from '$lib/components/Profile.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import ModifyUnplannedActivity from '$lib/components/ModifyUnplannedActivity.svelte';
	import ModifyPlannedActivity from '$lib/components/ModifyPlannedActivity.svelte';

	import { base } from '$app/paths';
	import { page } from '$app/stores';

	const navigationLinks = [
		{ title: 'Planning view', url: ['planning', ''], icon: Calendar },
		{ title: 'Upcomming activities', url: ['upcomming'], icon: Calendar },
		{ title: 'Past activities', url: ['past'], icon: Calendar }
	];

	let showNav = false;
</script>

<div class="flex">
	<!-- Navigation Bar -->
	<div
		class="absolute left-4 top-4 w-14 h-14 bg-green-400 hover:bg-green-500 cursor-pointer rounded-full flex items-center justify-center"
		on:click={() => (showNav = !showNav)}
	>
		<Icon src={Menu} size="16" />
	</div>

	<div class="transition-all" class:showNav>
		<nav
			class="fixed -left-72 transition-all bg-white flex-shrink-0 border-r w-64 p-4 border-slate-200 h-[100vh]"
		>
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

			<div
				class="absolute -right-7 bottom-7 w-14 h-14 bg-green-400 hover:bg-green-500 cursor-pointer rounded-full flex items-center justify-center"
				on:click={() => (showNav = !showNav)}
			>
				<Icon src={ChevronLeft} size="16" />
			</div>
		</nav>
	</div>

	<!-- Main Content -->
	<main class="grow p-5">
		<div class="flex gap-4 justify-end mb-10">
			<Button icon={Plus} on:click={modifyPlannedActivity.new}>Create new event</Button>

			<Profile firstname="John" lastname="Doe" />
		</div>

		<slot />
	</main>
</div>

<Modal visible={$modifyUnplannedActivity !== undefined} on:close={modifyUnplannedActivity.reset}>
	<ModifyUnplannedActivity />
</Modal>

<Modal visible={$modifyPlannedActivity !== undefined} on:close={modifyPlannedActivity.reset}>
	<ModifyPlannedActivity />
</Modal>

<style lang="postcss">
	.active {
		@apply text-green-500 border-l-2 border-green-700;
	}

	.showNav {
		@apply w-64;
	}

	.showNav > nav {
		@apply left-0;
	}
</style>
