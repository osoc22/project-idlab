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
import { RDF } from '@inrupt/vocab-common-rdf';
import userStore from '$lib/stores/userStore';

let podUrl: string = ''
let webID: string = ''

userStore.subscribe(val => {
	podUrl = val.podUrl;
	webID = val.webID;
});

interface SchemaEvent {
	self: string;
	startDate: string;
	endDate: string;
	about: string;
	location: string;
	activityType: string;
}

interface Schema {
	event_type: string;
	startDate_type: string;
	endDate_type: string;
	about_type: string;
	location_type: string;
	text_data_type: string;

	event: SchemaEvent;
}


// Links to types
export let schema: Schema = {
	event_type: "https://schema.org/Event",
	startDate_type: "https://schema.org/startDate",
	endDate_type: "https://schema.org/endDate",
	about_type: "https://schema.org/about",
	location_type: "https://schema.org/location",
	text_data_type: "https://schema.org/Text",

}

schema.event = {
	self: schema.event_type,
	startDate: schema.startDate_type,
	endDate: schema.endDate_type,
	about: schema.about_type,
	location: schema.location_type,
	activityType: schema.text_data_type // this can be replaced by a self-defined type
}

/**
 * Returns absolute url to dataset
 * 
 * @param 	{string} datasetName	name of the dataset you're looking for
 * @returns	{string} The datasetName prepended with podUrl and webId
 * */

function DatasetUrl(datasetName: string) {
	return `${podUrl}/${webID}/${datasetName}`;
}

/**
 * Returns a newly generated thing, populated with :
 * - type, 
 * - (optionally randomly generated) an id 
 * - (optionally) any other data
 * 
 * @param 	{string} 	type 	url to the objects scheme. Defaults to Thing (https://schema.org/Thing)
 * @param 	{object}	data   	any data that has to be added to the Thing. See @see dataToThing
 * @param 	{string}	id		the name/id for the Thing. If an id is provided to be used as name, use that.
 * 								(If there isn't, use the current full Datetime, which will be unique,
 * 								 unless the same user uses two devices and makes two updates at the EXACT same millisecond
 * 								 but look if they try that they're trying to break it so they get what the want)
 * @returns	{object}	Thing built with all the provided data
 */
function newThingBuilder(type = "https://schema.org/Thing", data = {}, id = (Date.now().toString())) {
	let newThing = buildThing(createThing({ "name": id }))
		.setUrl(RDF.type, type);  // Set type
	return dataToThing(newThing, data);
}

/**
 * Inserts data into a Thing builder, overwriting if existing, appending if not.
 * Cool things this function achieves:
 * - Automatically skips empty values
 * - When changing what function to use to set type (e.g. thingBuilder.setDatetime for https://schema.org/startDate), 
 * 		one change will change it everywhere
 * - Generally less typing work!
 * 
 * @param 	{object} thingBuilder	Thing builder. You can get this from running buildThing(thingObject)
 * 										Thing builder gets used to allow this to work with @see newThingBuilder 
 * 										as well as @see updateSavedThing
 * @param 	{object} data	 Data to be added to Thing. Structured as {rdf_type_url: thing_value_for_this_property}
 * @returns {object} Thing.build(), including any new date.
 */
function dataToThing(thingBuilder: any, data: object) {
	var types = Object.keys(data);

	types.forEach(type => {
		let value = data[type];
		if (!value) return;

		switch (type) {
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

	// Return built thing
	return thingBuilder.build();
}

/**
 * Saves a thing object, to a dataset with specified name
 * Will also create the dataset if it doesn't exist yet!
 * 
 * @param {string} datasetName	Name of the dataset to save to
 * @param {object} thing	Object of thing to save
 * 
 * @returns {promise}	Promise of saveSolidDatasetAt
 */
export async function saveThing(datasetName: string, thing: any) {
	let datasetUrl = DatasetUrl(datasetName);
	let dataset: any;
	try {
		dataset = await getSolidDataset(datasetUrl, { fetch: fetch });
		dataset = setThing(dataset, thing);
		return saveSolidDatasetAt(datasetUrl, dataset, { fetch: fetch });

	} catch (e: any) {
		// If dataset doesn't exist yet, repeat functions
		// TODO, specifcy error codes? e.response.status == 404 || e.response.status == 501
		dataset = createSolidDataset();
		await saveSolidDatasetAt(datasetUrl, dataset, { fetch: fetch });
		return saveThing(datasetName, thing);
	}
}

/**
 * Updates data in Thing, Thing selected by id in dataset selected by name
 * 
 * @param {string} 	datasetName	Name of the dataset to save to
 * @param {string}	thingId		Id/name of the Thing to save to
 * @param {object}	changes		Data to update in the Thing ( @see dataToThing )
 * 
 * @returns {promise} Promise of @see saveThing
 */
export async function updateSavedThing(datasetName: string, thingId: any, changes: {}) {
	let datasetUrl = DatasetUrl(datasetName);
	let dataset = (await getSolidDataset(datasetUrl, { fetch: fetch }));

	let existingThing = getThing(dataset, `${datasetUrl}#${thingId}`);
	let modifiedThing = dataToThing(buildThing(existingThing), changes)

	return saveThing(datasetName, modifiedThing);
}


/**
 * Removes a saved Thing by id, from dataset found by name
 * 
 * @param {string} datasetName	Name of the dataset where the thing is in
 * @param {string} thingId	Id/name of the Thing to delete
 * 
 * @returns {promise} promose of @function saveSolidDatasetAt
 */
export async function removeSavedThing(datasetName: string, thingId: any) {
	let datasetUrl = DatasetUrl(datasetName);
	let dataset = (await getSolidDataset(datasetUrl, { fetch: fetch }));
	let thing = getThing(dataset, `${datasetUrl}#${thingId}`);

	dataset = await removeThing(dataset, thing);
	return saveSolidDatasetAt(datasetUrl, dataset, { fetch: fetch })
}

/**
 * Creates a new Event Thing, saves it to calendar dataset. See https://schema.org/Event for more information.
 * 
 * @param {string}	description		Optional. User side about/description/text
 * @param {Date}	startDate		Start DateTime of event
 * @param {Date}	endDate			End DateTime of event
 * @param {string}	location		Optional. Location of the event
 * @param {string}	activityType	Optional. Custom field
 * 
 * @returns	{promise} Promise of @function saveThing
 */
export async function saveNewEvent(description: string = "", startDate: Date, endDate: Date, location: string = "", activityType: string = "") {
	let thingEvent = newThingBuilder(
		schema.event.self,
		{
			[schema.event.about]: description,
			[schema.event.startDate]: startDate,
			[schema.event.endDate]: endDate,
			[schema.event.location]: location,
			[schema.event.activityType]: activityType
		});

	return saveThing("calendar", thingEvent);
}


/**
 * Updates existing Event Thing
 * 
 * @param {string} eventId	Thing id/name of Event Thing to change
 * @param {object} changes	Data to change. @see dataToThing
 * 
 * @returns {promise} Promise of @see updateSavedThing
 */
export async function updateSavedEvent(eventId: string, changes: {}) {
	return updateSavedThing("calendar", eventId, changes);
}

/**
 * Removes existing Event Thing
 * 
 * @param {string} eventId	Thing id/name of Event Thing to remove
 * 
 * @returns {promise} Promise of @see removeSavedThing
 */
export async function removeSavedEvent(eventId: string) {
	return removeSavedThing("calendar", eventId);
}

/**
 * List all Things in a dataset (specified by name)
 * 
 * @param {string} datasetName 	Name of the dataset of which to list contents
 * @param {bool} returnAsArray	Set as false for output A (default), set as true for output B
 * 
 * @returns {console log} output A (returnAsArray false), logs Dataset contents to console, mostly for use in debugging
 * 		Structure:
 *	 		thing-id-as-string
 *	 		|> thing as object
 *	 		-----
 *	 	  	thing-id-as-string
 *	 		|> thing as object
 *	 		-----
 * 
 * @returns {array} output B (returnAsArray true), returns array of Thing objects, mostly for use in code
 */
export async function listThingsFromDataset(datasetName: string, returnAsArray = false) {
	let things = await getThingAll(await getSolidDataset(DatasetUrl(datasetName), { fetch: fetch }), {});
	if (returnAsArray) return things;
	else {
		things.forEach((thing) => {
			console.log(thing.url.split("#")[1]);
			console.dir(thing);
			console.log("-----")
		});
	}
}

// A function that can be called that tests out the code above!
export async function tester() {
	// Save an event that starts now and ends in two hours
	var start = new Date();
	var end = new Date();
	end.setHours(end.getHours() + 2);

	await saveNewEvent("2 hours, starting now!", start, end, "here", "random");  // To be updated
	await saveNewEvent("2 hours, starting now!", start, end, "here");  // This one just stays
	await saveNewEvent("2 hours, starting now!", start, end);  // To be removed


	// Set the first events start and end to now
	// NOTE: don't forget to () your await because otherwise it doesn't work!

	let events = await listThingsFromDataset("calendar", true)
	console.log(events)
	let firstEventUrl = events[0].url.split("#")[1];
	let thirdEventUrl = events[2].url.split("#")[1];

	await updateSavedEvent(firstEventUrl, {
		[schema.event.startDate]: new Date(),
		[schema.event.endDate]: new Date(),
		[schema.event.location]: "Everywhere"
	});
	await removeSavedEvent(thirdEventUrl);
}

