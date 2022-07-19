<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';

	import { onMount } from 'svelte';
	import user from '$lib/stores/userStore';

	onMount(() => {
		// If a user is logged in, redirect to the calendar page.
		if ($user.userSession.isLoggedIn) {
			goto(base + '/upcomming');
		}
	});
</script>
