<script lang="ts">
	import Profile from '$lib/components/Profile.svelte';
	import Calendar from '$lib/components/Calendar.svelte';
</script>

<div class="header">
	<h1 class="title">Your calendar</h1>
	<div id="createEvent">+ Create new event</div>
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

	#createEvent {
		margin-left: auto;
		cursor: pointer;
	}
</style>
