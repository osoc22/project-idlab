<script lang="ts">
import { goto } from "$app/navigation";
import {base} from "$app/paths"

import { onMount } from "svelte";
import user from "$lib/stores/userStore"

	onMount(() => {
		if ($user.userSession.isLoggedIn) {
			goto(base + '/upcomming')
		}
	}) 
</script>