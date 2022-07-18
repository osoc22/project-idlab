<script lang="ts">
	import { onMount } from 'svelte';

	import { Temporal } from '@js-temporal/polyfill';
	import { Icon, ArrowRight, ArrowLeft, Plus, TrendingDown } from 'svelte-hero-icons';

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
		saveSolidDatasetAt,
getThing
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

	// Function that generates an absolute url from a dataset name
	function DatasetUrl(datasetName : string) {
		return `${podUrl}/${webID}/${datasetName}`;
	}

	// Function to be used when creating a new THing
	// If an id is provided to be used as name, use that.
	// If there isn't, use the current full Datetime, which will be unique!
	// (unless the same user uses two devices and makes two updates at the EXACT same millisecond
	// but look if they try that they're trying to break it so they get what the want)
	function newThing(id = (Date.now().toString())) {
		return buildThing(createThing({ "name": id }))
	}

	//
	async function saveNewThing(datasetName : string, thing: any) {
		let datasetUrl = DatasetUrl(datasetName);
		let dataset : any;
		try {
			dataset = await getSolidDataset(datasetUrl, { fetch: fetch });
			dataset = setThing(dataset, thing);
			await saveSolidDatasetAt(datasetUrl, dataset, { fetch: fetch });

		} catch (e: any) {
			// If dataset doesn't exist yet, repeat functions
			if (e.response.status == 404) {
				dataset = createSolidDataset();
				await saveSolidDatasetAt(datasetUrl, dataset, { fetch: fetch });
				saveNewThing(datasetName, thing);
			}
			else {
				console.error(e);
			}
		}
	}
	window.saveNewThing = saveNewThing;

	async function updateSavedThing(datasetName : string, thingId: any, returnModifiedThing: any) {
		let datasetUrl = DatasetUrl(datasetName);

		let dataset = await getSolidDataset(datasetUrl, { fetch: fetch });
		let thing = await returnModifiedThing(buildThing(getThing(dataset, `${datasetUrl}#${thingId}`))).build();
		dataset = setThing(dataset, thing);

		await saveSolidDatasetAt(datasetUrl, dataset, { fetch: fetch });
	}
	window.updateSavedThing = updateSavedThing;



	// Save event to 
	async function saveNewEvent(startDate: Date, endDate: Date) {
		let thingEvent = newThing()
			.addDatetime(ICAL.dtstart, startDate)
			.addDatetime(ICAL.dtend, endDate)
			.build();

		saveNewThing("calendar", thingEvent);
	}
	window.saveNewEvent = saveNewEvent;

	async function updateSavedEvent(eventId: string, startDate: Date, endDate: Date) {
		await updateSavedThing("calendar", eventId, (thing: any) => {
			console.log(thing)
			return thing
				.setDatetime(ICAL.dtstart, startDate)
				.setDatetime(ICAL.dtend, endDate)
		});
	}
	window.updateSavedEvent = updateSavedEvent;


	async function listThingsFromDataset(datasetName: string) {
		let things = getThingAll(await getSolidDataset(DatasetUrl(datasetName), {fetch: fetch}), {});
		things.forEach((thing) => {
			console.log(thing.url.split("#")[1]);
			console.dir(thing);
			console.log("-----")
		});

	}
	window.listThingsFromDataset = listThingsFromDataset;
	
	async function tester() {
		// Save an event that starts now and ends in two hours
		var start = new Date();
		var end = new Date(start.setHours(start.getHours() + 2));
		await saveNewEvent(start, end);


	} 

	window.tester = tester;
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
