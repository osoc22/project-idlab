<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { base } from '$app/paths';

	import Login from '$lib/components/Login.svelte';
	import NavigationBar from '$lib/components/NavigationBar.svelte';

	import user from '$lib/stores/userStore';

	import setupActivities from '$lib/hardcoded/setupActivities';

	onMount(() => {
		user.init();
		window.setupActivities = setupActivities;
	});
</script>

{#if $user.loading}
	<div class="w-full h-[100vh] flex items-center justify-center antialiased">
		<img class="h-80 rounded-lg" src="{base}/loading.gif" alt="loading" height="400" />
	</div>
{:else if $user.userSession.isLoggedIn}
	<NavigationBar>
		<slot />
	</NavigationBar>
{:else}
	<Login />
{/if}
