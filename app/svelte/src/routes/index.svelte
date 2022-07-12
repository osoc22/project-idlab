<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Calendar from '$lib/components/Calendar.svelte';
	import Profile from '$lib/components/Profile.svelte';
</script>

<div class="header">
	<h1 class="text-3xl font-bold underline">Your calendar</h1>
	<Button>+ Create new event</Button>
	<Profile firstname="Abel" lastname="de Bruijn" />
</div>

<Calendar />

<style>
	.header {
		margin: 1rem 2rem;
		width: calc(100% - 8rem);
		display: flex;
		align-items: center;
		gap: 1rem;
		padding-inline: 2rem;
	}

	#title {
		margin-right: auto;
	}
</style>
