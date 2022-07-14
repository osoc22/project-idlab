<script lang="ts">
	import { onMount } from 'svelte';

	import { Temporal } from '@js-temporal/polyfill';
	import { Icon, ArrowRight, ArrowLeft, Plus } from 'svelte-hero-icons';

	import { editEvent } from '$lib/stores/eventStore';

	import Button from '$lib/components/Button.svelte';
	import Calendar from '$lib/components/Calendar.svelte';
	import Profile from '$lib/components/Profile.svelte';
	import RoundButton from '$lib/components/RoundButton.svelte';

	import {
		login,
		handleIncomingRedirect,
		getDefaultSession,
		fetch
	} from '@inrupt/solid-client-authn-browser';
	import {
		createSolidDataset,
		buildThing,
		setThing,
		getSolidDataset,
		createThing,
		getThingAll,
		saveSolidDatasetAt
	} from '@inrupt/solid-client';
	import { SCHEMA_INRUPT, RDF } from '@inrupt/vocab-common-rdf'; // == https://schema.org/name

	const today = Temporal.Now.plainDateISO();
	let startOfWeek: Temporal.PlainDate;

	let podUrl: string;
	let webID: string;
	let interfaceUrl: string;

	function gotoToday() {
		startOfWeek = today.subtract({ days: today.dayOfWeek - 1 });
		return startOfWeek;
	}

	// On load,
	onMount(async () => {
		gotoToday();

		// If trying to log in: do that. Or if a previous session can still be used to log in: do that instead
		await handleIncomingRedirect({
			restorePreviousSession: true
		});

		const session = getDefaultSession();

		interfaceUrl = window.location.href;
		podUrl = localStorage.getItem('podUrl') || 'http://localhost:3000';
		webID = localStorage.getItem('webID') || 'johndoe';

		// On load, if the user is logged in, try getting data
		if (session.info.isLoggedIn) getData();
	});

	/**
	 * Implementation based on https://docs.inrupt.com/developer-tools/javascript/client-libraries/tutorial/authenticate-browser/
	 */
	async function handleLogin() {
		podUrl = prompt('URL to identity provider/pod host:', podUrl) ?? podUrl;
		webID = prompt('WebID: ', webID) ?? webID;

		if (podUrl.indexOf('//') < 0) {
			podUrl = 'http://' + podUrl;
		}

		// Set podUrl and webId for next sessions
		localStorage.setItem('podUrl', podUrl);
		localStorage.setItem('webID', webID);

		// If user is not yet logged in -> log in
		if (!getDefaultSession().info.isLoggedIn) {
			await login({
				oidcIssuer: podUrl,
				clientName: 'Project-IDLab',
				redirectUrl: interfaceUrl
			});
		}

		console.log('get data');
		getData();
	}

	/**
	 * Get data from pod
	 */
	async function getData() {
		// https://docs.inrupt.com/developer-tools/javascript/client-libraries/tutorial/read-write-data/#write-a-new-soliddataset
		let dataset: any;
		console.log('ytest');
		let datasetname = 'test2';
		let thing: any;
		console.log(`${podUrl}/${webID}/${datasetname}`);

		try {
			dataset = await getSolidDataset(`${podUrl}/${webID}/${datasetname}`, { fetch: fetch });
			thing = getThingAll(dataset);
			console.log(thing);
		} catch (e: any) {
			console.log(e);
			if (e.response.status == 404) {
				console.log('Dataset not found, creating new one');
				dataset = createSolidDataset();
				thing = buildThing(createThing({ name: 'thingname' }))
					.addStringNoLocale(SCHEMA_INRUPT.name, 'Schema inrupt name')
					.addUrl(RDF.type, 'https://schema.org/Thing')
					.build();
			}
		}
		console.log(thing);
		dataset = setThing(dataset, thing);

		await saveSolidDatasetAt(`${podUrl}/${webID}/${datasetname}`, dataset, { fetch: fetch });
	}
</script>

<div class="flex py-5 px-4 justify-between items-center gap-4">
	<h1 class="text-3xl font-bold underline">Your calendar</h1>

	<RoundButton filled on:click={() => (startOfWeek = startOfWeek.subtract({ weeks: 1 }))}>
		<Icon src={ArrowLeft} class="cursor-pointer" size="16" />
	</RoundButton>
	<RoundButton filled on:click={() => (startOfWeek = startOfWeek.add({ weeks: 1 }))}>
		<Icon src={ArrowRight} class="cursor-pointer" size="16" />
	</RoundButton>

	<div class="m-auto" />

	<Button on:click={editEvent.new}>
		<Icon slot="icon" src={Plus} size="16" />
		Create new event
	</Button>
	<Profile firstname="Abel" lastname="de Bruijn" on:click={handleLogin} />
</div>

<Calendar {startOfWeek} />
