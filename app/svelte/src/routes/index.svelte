<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Calendar from '$lib/components/Calendar.svelte';
	import Profile from '$lib/components/Profile.svelte';

	import {
			login,
			handleIncomingRedirect,
			getDefaultSession,
			fetch
	} from "@inrupt/solid-client-authn-browser";
	import { createSolidDataset, getStringNoLocale, buildThing, addUrl, getUrl, setThing, getSolidDataset, createThing, getThingAll, saveSolidDatasetAt, getPodUrlAll, getProfileAll, fromRdfJsDataset } from "@inrupt/solid-client";
	import { SCHEMA_INRUPT, RDF } from "@inrupt/vocab-common-rdf" // == https://schema.org/name


	import { onMount } from 'svelte';

	let podUrl; let webID; let interfaceUrl;
	// On load, 
	onMount(async () => {
		// If trying to log in: do that. Or if a previous session can still be used to log in: do that instead
		await handleIncomingRedirect({
			restorePreviousSession: true
		});
		var session = getDefaultSession();

		interfaceUrl = window.location.href;
		podUrl = localStorage.getItem("podUrl") || "http://localhost:3000";
		webID = localStorage.getItem("webID") || "johndoe";

		// On load, if the user is logged in, try getting data
		if (session.info.isLoggedIn) {
			getData();
		}
	});

	// Implementation based on https://docs.inrupt.com/developer-tools/javascript/client-libraries/tutorial/authenticate-browser/
	async function handleLogin() {
		podUrl = prompt("URL to identity provider/pod host:", podUrl);
		webID = prompt("WebID: ", webID);

		if (podUrl.indexOf("//") < 0) {
        	podUrl = "http://" + podUrl;
    	}

		localStorage.setItem("podUrl", podUrl);
		localStorage.setItem("webID", webID);

		if (!getDefaultSession().info.isLoggedIn) {
			await login({
				oidcIssuer: podUrl,
				clientName: "Project-IDLab",
				redirectUrl: interfaceUrl
			});
		}
		getData();
	}
	async function getData() {
		// https://docs.inrupt.com/developer-tools/javascript/client-libraries/tutorial/read-write-data/#write-a-new-soliddataset
		var dataset;
		console.log("ytest")
		var datasetname = "test2";
		var thingname = "thingname";
		var thing;
		console.log(`${podUrl}/${webID}/${datasetname}`)

		try {
			dataset = await getSolidDataset(`${podUrl}/${webID}/${datasetname}`, {fetch: fetch})
			thing = getThingAll(dataset);
			console.log(thing);
		} catch (e) {
			console.log(e)
			if (e.response.status == 404) {
				console.log("Dataset not found, creating new one")
				dataset = createSolidDataset();
				thing = buildThing(createThing({name: "thingname"}))
					.addStringNoLocale(SCHEMA_INRUPT.name, "Schema inrupt name")
					.addUrl(RDF.type, "https://schema.org/Thing")
					.build();
			}
		}
		console.log(thing);
		dataset = setThing(dataset, thing);
		
		await saveSolidDatasetAt(`${podUrl}/${webID}/${datasetname}`, dataset, {fetch: fetch});
	}
</script>

<div class="header">
	<h1 id="title">Your calendar</h1>
	<Button>+ Create new event</Button>
	<Profile firstname="Abel" lastname="de Bruijn" func={handleLogin} />
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

	#title {
		margin-right: auto;
	}
</style>
