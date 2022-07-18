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
		createSolidDataset,
		buildThing,
		setThing,
		getSolidDataset,
		createThing,
		getThingAll,
		saveSolidDatasetAt
	} from '@inrupt/solid-client';
	import { fetch } from '@inrupt/solid-client-authn-browser';
	import { SCHEMA_INRUPT, RDF, ICAL} from '@inrupt/vocab-common-rdf'; // == https://schema.org/name


	const today = Temporal.Now.plainDateISO();
	let startOfWeek: Temporal.PlainDate;

	let podUrl: string;
	let webID: string;
	podUrl = localStorage.getItem('podUrl') || "localhost:3000";
	webID = localStorage.getItem('webID') || "johndoe";


	function gotoToday() {
		startOfWeek = today.subtract({ days: today.dayOfWeek - 1 });
		return startOfWeek;
	}

	// On load,
	onMount(async () => {
		gotoToday();

		getData();
	});

	/**
	 * Get data from pod
	 */
	async function getData() {
		// https://docs.inrupt.com/developer-tools/javascript/client-libraries/tutorial/read-write-data/#write-a-new-soliddataset
		let dataset: any; // eslint-disable-line
		console.log('ytest');
		let datasetname = 'test2';
		let thing: any; // eslint-disable-line
		console.log(`${podUrl}/${webID}/${datasetname}`);

		try {
			dataset = await getSolidDataset(`${podUrl}/${webID}/${datasetname}`, { fetch: fetch });
			thing = getThingAll(dataset);
			console.log(thing);

			// eslint-disable-next-line
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
	window.getData = getData;

	function DatasetUrl(datasetName : string) {
		return `${podUrl}/${webID}/${datasetName}`;
	}

	async function SaveData(datasetName : string, thing: any) {
		let datasetUrl = DatasetUrl("calendar");
		let dataset : any;
		try {
			dataset = await getSolidDataset(datasetUrl, { fetch: fetch });
			dataset = setThing(dataset, thing);
			await saveSolidDatasetAt

		} catch (e: any) {
			// If dataset doesn't exist yet, repeat functions
			if (e.response.status == 404) {
				dataset = createSolidDataset();
				await saveSolidDatasetAt(datasetUrl, dataset, { fetch: fetch });
				SaveData(datasetName, thing);
			}
			else {
				console.error(e);
			}
		}
	}
	window.SaveData = SaveData;

	// Save event to 
	// Tester: SaveEvent(Date.now())
	async function SaveEvent(startDate: Date, endDate: Date) {
		let thingEvent = buildThing(
			createThing({ "name": DatasetUrl("calendar")}))
			.addDatetime(ICAL.dtstart, startDate)
			.addDatetime(ICAL.dtend, endDate)
			.build();

		SaveData("calendar", thingEvent);
	}
	window.SaveEvent = SaveEvent;
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
	<Profile firstname="Abel" lastname="de Bruijn" />
</div>

<Calendar {startOfWeek} />
