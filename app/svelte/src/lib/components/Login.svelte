<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/input/Input.svelte';

	import userStore from '$lib/stores/userStore';
	import getErrorMessage from '$lib/utils/getErrorMessage';

	let interfaceUrl: string;

	let podUrl = 'http://localhost:3000';
	let podError = '';
	let storageLocation = 'http://localhost:3000/johndoe';

	async function handleLogin() {
		try {
			await userStore.signIn(podUrl, storageLocation, interfaceUrl);
		} catch (e) {
			podError = getErrorMessage(e).message;
		}
	}

	function goToDocs() {
		goto('https://osoc22.github.io/project-idlab/');
	}

	onMount(async () => {
		interfaceUrl = window.location.href;

		podUrl = localStorage.getItem('podUrl') || 'http://localhost:3000';
		//webID = localStorage.getItem('webID') || 'johndoe';
		storageLocation = localStorage.getItem('storageLocation') || 'http://localhost:3000/johndoe';
	});
</script>

<div class="max-w-lg my-16 mx-auto">
	<h1 class="text-2xl">Welcome to the pod</h1>
	<Input label="pod url" error={podError} bind:value={podUrl} />
	<Input label="Storage location" bind:value={storageLocation} />

	<Button focused on:click={handleLogin}>Login with pod</Button>
	<br />
	<Button on:click={goToDocs}>Learn how to obtain your own pod</Button>
</div>
