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
getThing,
removeThing
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

	// Links to types
	let schema = {
		event_type: "https://schema.org/Event",
		startDate_type: "https://schema.org/startDate",
		endDate_type: "https://schema.org/endDate",
		about_type: "https://schema.org/about",
		location_type: "https://schema.org/location",
		text_data_type: "https://schema.org/Text"
	}

	schema.event = {
		self: schema.event_type,
		startDate: schema.startDate_type,
		endDate: schema.endDate_type,
		about: schema.about_type,
		location: schema.location_type,
		activityType: schema.text_data_type // this can be replaced by a self-defined type
	} 
	window.schema = schema;


	// On load,
	// - adapt the schema to be more programming friendly
	onMount(async () => {
		gotoToday();
	});

	// Function that generates an absolute url from a dataset name
	function DatasetUrl(datasetName : string) {
		return `${podUrl}/${webID}/${datasetName}`;
	}

	// Function to be used when creating a new Thing
	// If an id is provided to be used as name, use that.
	// If there isn't, use the current full Datetime, which will be unique!
	// (unless the same user uses two devices and makes two updates at the EXACT same millisecond
	// but look if they try that they're trying to break it so they get what the want)
	// Set the type url, unless one is given, in which case make a base Thing
	function newThing(type = "https://schema.org/Thing", id = (Date.now().toString())) {
		return buildThing(createThing({ "name": id }))
			.setUrl(RDF.type, type)
	}

	// Function that saves a passed Thing to the dataset with the passed name
	// Oh and it'll create the dataset if it doesn't already exist!
	async function saveThing(datasetName : string, thing: any) {
		let datasetUrl = DatasetUrl(datasetName);
		let dataset : any;
		try {
			console.log("Trying save")
			dataset = await getSolidDataset(datasetUrl, { fetch: fetch });
			dataset = setThing(dataset, thing);
			await saveSolidDatasetAt(datasetUrl, dataset, { fetch: fetch });

		} catch (e: any) {
			console.log("error caughgt")
			// If dataset doesn't exist yet, repeat functions
			//e.response.status == 404 || e.response.status == 501) {
			dataset = createSolidDataset();
			await saveSolidDatasetAt(datasetUrl, dataset, { fetch: fetch });
			await saveThing(datasetName, thing);
		}
	}
	window.saveThing = saveThing;

	/*	This function is a bit funky
	   	1: Finds the dataset with the specified dataSetname 
	   	2: In that dataset, find the thing with the specified thingId
	   	3: Then, pass an array of [[type, value]]
		*/
	// 	And then your thing will automatically get updated!
	async function updateSavedThing(datasetName : string, thingId: any, ...changes: any[]) {
		let datasetUrl = DatasetUrl(datasetName);
		let dataset = (await getSolidDataset(datasetUrl, { fetch: fetch }));
		let thingBuilder = buildThing(getThing(dataset, `${datasetUrl}#${thingId}`))


		changes.forEach(change => {
			let type = change[0];
			let value = change[1];
			switch(type) {
				// Date parser
				case schema.startDate_type || schema.endDate_type:
					thingBuilder.setDatetime(type, value);
				// Text parsers 
				case schema.text_data_type || schema.about_type || schema.location_type || schema.event.activityType:
					thingBuilder.setStringNoLocale(type, value);
				
				default:
					thingBuilder.setStringNoLocale(type, value);
			}
		});
		
		let thing = thingBuilder.build();
		//let thing = (await returnModifiedThing(buildThing(getThing(dataset, `${datasetUrl}#${thingId}`))).build());
		
		await saveThing(datasetName, thing);
	}
	window.updateSavedThing = updateSavedThing;


	// This function removes a saved thing with id thingId, from the dataset with the specified datasetName
	async function removeSavedThing(datasetName: string, thingId: any) {
		let datasetUrl = DatasetUrl(datasetName);
		let dataset = (await getSolidDataset(datasetUrl, { fetch: fetch }));
		let thing = getThing(dataset, `${datasetUrl}#${thingId}`);

		dataset = await removeThing(dataset, thing);
		await saveSolidDatasetAt(datasetUrl, dataset, {fetch: fetch})
	}
	window.removeSavedThing = removeSavedThing;

	// [[thing, type, value], []...]
	function setThingIfPassed(values: any[]) {
		
		for (var i = 0; i < values.length; i++) {
			var value = values[i];

			var thing = value[0];
			var type = value[1];
			var value = value[2];
			/*
		switch(type):
			case schema.startDate_type || schema.¨
			}*/
		} 
	}


	// Create a new event, save it to calendar dataset
	async function saveNewEvent(description: string = "", startDate: Date, endDate: Date, location: string = "", activityType: string = "") {
		let thingEvent = newThing(schema.event.self)
			.addStringNoLocale(schema.event.about, description)
			.addDatetime(schema.event.startDate, startDate)
			.addDatetime(schema.event.endDate, endDate)
			.addStringNoLocale(schema.event.location, location)
			.addStringNoLocale(schema.event.activityType, activityType)
			.build();

		await saveThing("calendar", thingEvent);
	}
	window.saveNewEvent = saveNewEvent;

	// Update an existing event
	async function updateSavedEvent(eventId: string, description=null, startDate=null, endDate=null, location=null, activityType=null) {
		// Set to 
		const schemaOrder = [schema.event.about, schema.event.startDate, schema.event.endDate, schema.event.location, schema.event.activityType];
		let args = [...arguments].shift();
		let changes = [];
		for (var i = 0; i < args.length; i++) {
			let value = args[i];
			if (value != null) {
				changes.push(schemaOrder[i], value)
			}
		}
		await updateSavedThing("calendar", eventId, changes);
	}
	window.updateSavedEvent = updateSavedEvent;

	async function removeSavedEvent(eventId: string) {
		await removeSavedThing("calendar", eventId);
	}
	window.removeSavedEvent = removeSavedEvent;

	// Get all things from dataset with name datasetName
	// If returnAsArray is true, do a clean return (mostly for use in code)
	// if returnAsArray is false (default), log to ocnsole (mostly for use in debugging)
	/* Output:
		thing-id-as-string
		|> thing as object
		-----
		other-thing-id-as-string
		|> other-thing as object
		-----
	*/
	async function listThingsFromDataset(datasetName: string, returnAsArray = false) {
		let things = getThingAll(await getSolidDataset(DatasetUrl(datasetName), {fetch: fetch}), {});
		if (returnAsArray) return things;
		else {
			things.forEach((thing) => {
				console.log(thing.url.split("#")[1]);
				console.dir(thing);
				console.log("-----")
			});
		}
	}
	window.listThingsFromDataset = listThingsFromDataset;
	
	// A function that can be called that tests out the code above!
	async function tester() {
		// Save an event that starts now and ends in two hours
		var start = new Date();
		var end = new Date();
		end.setHours(end.getHours() + 2);

		await saveNewEvent("2 hours, starting now!", start, end, "here", "random");  // To be updated
		await saveNewEvent("2 hours, starting now!",  start, end, "here");  // This one just stays
		await saveNewEvent("2 hours, starting now!", start, end);  // To be removed


		// Set the first events start and end to now
		// NOTE: don't forget to () your await because otherwise it doesn't work!

		let events = await listThingsFromDataset("calendar", true)
		console.log(events)
		let firstEventUrl = events[0].url.split("#")[1];
		let thirdEventUrl = events[2].url.split("#")[1];
		
		await updateSavedEvent(firstEventUrl, {
			schema.event.startDate: new Date(), 
			schema.event.endDate: new Date(), 
			schema.event.location: "Everywhere"
		});
		await removeSavedEvent(thirdEventUrl);
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
