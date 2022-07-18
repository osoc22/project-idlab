<script lang="ts">
	import '../app.css';

	import Login from '$lib/components/Login.svelte';
	import NavigationBar from '$lib/components/NavigationBar.svelte';

	import { getDefaultSession } from '@inrupt/solid-client-authn-browser';
</script>

{#if getDefaultSession()?.info.isLoggedIn || true}
	<NavigationBar>
		<slot />
	</NavigationBar>
{:else}
	<Login />
{/if}
