<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';

	import setupActivities from '$lib/hardcoded/setupActivities';

	import Login from '$lib/components/Login.svelte';
	import NavigationBar from '$lib/components/NavigationBar.svelte';

	import user from '$lib/stores/userStore';

	onMount(() => {
		user.init();
		setupActivities();
	});
</script>

{#if $user.loading}
	<p>We are Loading</p>
{:else if $user.userSession.isLoggedIn}
	<NavigationBar>
		<slot />
	</NavigationBar>
{:else}
	<Login />
{/if}
