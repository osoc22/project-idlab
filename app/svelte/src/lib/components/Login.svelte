<script lang="ts">
	import { onMount } from 'svelte';

	import getErrorMessage from '$lib/utils/getErrorMessage';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/input/Input.svelte';

	import {
		handleIncomingRedirect,
		getDefaultSession,
		login
	} from '@inrupt/solid-client-authn-browser';

	let interfaceUrl: string;

	let podUrl = 'http://localhost:3000';
	let podError = '';
	let webID = 'johndoe';
	let idError = '';

	/**
	 * Implementation based on https://docs.inrupt.com/developer-tools/javascript/client-libraries/tutorial/authenticate-browser/
	 */
	async function handleLogin() {
		podError = '';
		idError = '';

		if (!podUrl) return (podError = 'Please enter a pod URL');
		if (!webID) return (idError = 'Please enter a web ID');

		if (podUrl.indexOf('//') < 0) {
			podUrl = 'http://' + podUrl;
		}

		// Set podUrl and webId for next sessions
		localStorage.setItem('podUrl', podUrl);
		localStorage.setItem('webID', webID);

		// If something goes wrong, the error message will be displayed in the UI
		try {
			// If user is not yet logged in -> log in
			if (!getDefaultSession().info.isLoggedIn) {
				await login({
					oidcIssuer: podUrl,
					clientName: 'Project-IDLab',
					redirectUrl: interfaceUrl
				});
			}
		} catch (e) {
			podError = getErrorMessage(e).message;
		}
	}

	onMount(async () => {
		// If trying to log in: do that. Or if a previous session can still be used to log in: do that instead
		await handleIncomingRedirect({
			restorePreviousSession: true
		});

		interfaceUrl = window.location.href;

		podUrl = localStorage.getItem('podUrl') || 'http://localhost:3000';
		webID = localStorage.getItem('webID') || 'johndoe';
	});
</script>

<div class="max-w-lg my-16 mx-auto">
	<h1 class="text-2xl">Welcome to the pod</h1>
	<Input label="pod url" error={podError} bind:value={podUrl} />
	<Input label="webId" error={idError} bind:value={webID} />
	<Button focused on:click={handleLogin}>Login with pod</Button>
</div>
