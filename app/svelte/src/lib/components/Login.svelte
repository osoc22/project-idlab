<script lang="ts">
	import { onMount } from 'svelte';

	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/input/Input.svelte';

	import userStore from '$lib/stores/userStore';
	import getErrorMessage from '$lib/utils/getErrorMessage';

	let interfaceUrl: string;

	let podUrl = 'http://localhost:3000';
	let podError = '';
	let webID = 'johndoe';

	async function handleLogin() {
		try {
			userStore.signIn(podUrl, webID, interfaceUrl);
		} catch (e) {
			podError = getErrorMessage(e).message;
		}
	}

	onMount(async () => {
		interfaceUrl = window.location.href;

		podUrl = localStorage.getItem('podUrl') || 'http://localhost:3000';
		webID = localStorage.getItem('webID') || 'johndoe';
	});
</script>

<div class="max-w-lg my-16 mx-auto">
	<h1 class="text-2xl">Welcome to the pod</h1>
	<Input label="pod url" error={podError} bind:value={podUrl} />
	<Input label="webId" bind:value={webID} />
	<Button focused on:click={handleLogin}>Login with pod</Button>
</div>
