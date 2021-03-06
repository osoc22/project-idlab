import {
	createSolidDataset,
	buildThing,
	setThing,
	getSolidDataset,
	createThing,
	getThingAll,
	saveSolidDatasetAt,
	getThing,
	removeThing,
	getDatetime,
	getStringNoLocale,
	type Thing,
	asUrl
} from '@inrupt/solid-client';
import { fetch } from '@inrupt/solid-client-authn-browser';
import { RDF } from '@inrupt/vocab-common-rdf';
import userStore from '$lib/stores/userStore';

let storageLocation: string = '';

userStore.subscribe((val) => {
	storageLocation = val.storageLocation;
});

export interface SchemaEvent {
	self: string;
	startDate: string;
	endDate: string;
	about: string;
	location: string;
	activityType: string;
	notifyOnWeather: string;
}

interface Schema {
	event_type: string;
	startDate_type: string;
	endDate_type: string;
	about_type: string;
	location_type: string;
	text_data_type: string;
	keywords_type: string;
	url_type: string;
	description_type: string;

	event?: SchemaEvent;
}

// Links to types
export const schema: Schema = {
	event_type: 'https://schema.org/Event',
	startDate_type: 'https://schema.org/startDate',
	endDate_type: 'https://schema.org/endDate',
	about_type: 'https://schema.org/about',
	location_type: 'https://schema.org/location',
	text_data_type: 'https://schema.org/Text',
	keywords_type: 'https://schema.org/keywords',
	url_type: 'https://schema.org/URL',
	description_type: 'https://schema.org/description'
};

schema.event = {
	self: schema.event_type,
	startDate: schema.startDate_type,
	endDate: schema.endDate_type,
	about: schema.about_type,
	location: schema.location_type,
	activityType: schema.description_type,
	notifyOnWeather: schema.keywords_type
};

export function thingIdFromUrl(url: string) {
	// Reasoning behind the # and / thing, @see thingUrl
	let delimiter = '#';
	if (!url.includes(delimiter)) {
		delimiter = '/';
	}
	return url.substring(url.lastIndexOf(delimiter) + 1);
}

/**
 * Returns absolute url to dataset
 *
 * @param datasetName	name of the dataset you're looking for
 * @returns The datasetName prepended with podUrl and webId
 * */

function DatasetUrl(datasetName: string) {
	return `${storageLocation}/${datasetName}`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function thingUrl(datasetName: string, thing: any) {
	// Sometimes new files return something like https://inrupt.com/.well-known/sdk-local-node/1658841527554
	// So ensure that the url is the one with dataseturl
	return asUrl(thing, DatasetUrl(datasetName));
}

/**
 * Returns a newly generated thing, populated with :
 * - type,
 * - (optionally randomly generated) an id
 * - (optionally) any other data
 *
 * @param 	type 	url to the objects scheme. Defaults to Thing (https://schema.org/Thing)
 * @param	data   	any data that has to be added to the Thing. See @see dataToThing
 * @param	id		the name/id for the Thing. If an id is provided to be used as name, use that.
 * 								(If there isn't, use the current full Datetime, which will be unique,
 * 								 unless the same user uses two devices and makes two updates at the EXACT same millisecond
 * 								 but look if they try that they're trying to break it so they get what the want)
 *   							(To check if there isn't an id, an empty string is used. This is so functions
 * 								 that make use of newThingBuilder can pass an empty string in case they want to autogenerate
 * @returns	Thing built with all the provided data
 */
function newThingBuilder(type = 'https://schema.org/Thing', data = {}, id = '') {
	if (!id) {
		// If no id was passed ("", false, undefined, null)
		id = Date.now().toString(); // Auto-generate an id
	}
	const newThing = buildThing(createThing({ name: id })).setUrl(RDF.type, type); // Set type
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
 * @param thingBuilder	Thing builder. You can get this from running buildThing(thingObject)
 * 										Thing builder gets used to allow this to work with @see newThingBuilder
 * 										as well as @see updateSavedThing
 * @param  data	 Data to be added to Thing. Structured as {rdf_type_url: thing_value_for_this_property}
 * @returns Thing.build(), including any new date.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function dataToThing(thingBuilder: any, data: { [key: string]: any }) {
	const types = Object.keys(data);

	types.forEach((type) => {
		const value = data[type];
		if (!value) return;

		switch (type) {
			// Date parser
			case schema.startDate_type:
			case schema.endDate_type:
				thingBuilder.setDatetime(type, new Date(value));
				break;
			default:
				thingBuilder.setStringNoLocale(type, value);
		}
	});

	// Return built thing
	return thingBuilder.build();
}

/**
 * Make sure getDatetime returns some string
 */
function getDateFromThing(thing: Thing, type: string): string {
	const dateTime = getDatetime(thing, type);
	let dateString = dateTime?.toString();

	if (!dateTime) dateString = getStringNoLocale(thing, type) || '';
	return dateString || '';
}

/**
 * Turn a Thing object into a proper Javascript object
 * Inverse of @see dataToThing
 *
 * @param thing 		The object of the Thing, gotten from @function getThing or @function getThingAll
 * @param thingSchema 	The schema the Thing follows
 *
 * @returns A stripped Javascript object
 */
function thingToData(thing: Thing, thingSchema: SchemaEvent) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const data: Partial<{ [key: string]: any }> = {};

	data.self = 'https://schema.org/Event';

	const thingEntries = Object.entries(thingSchema) as [keyof SchemaEvent, string][];

	thingEntries.forEach(([typeKey, type]) => {
		if (typeKey == 'self') return; // @see schema

		switch (type) {
			case schema.startDate_type:
			case schema.endDate_type:
				data[typeKey] = getDateFromThing(thing, type);
				break;
			default:
				data[typeKey] = getStringNoLocale(thing, type) || '';
				break;
		}
	});

	data['url'] = thing.url;

	return data;
}

/**
 * Get a Thing with the specified id, from the dataset with the specified name
 *
 * @param datasetName name of dataset to get the thing from
 * @param thingId id/name of Thing to get
 *
 * @returns Promise of @function getThing
 */
export async function getThingFromDataset(datasetName: string, thingId: string) {
	const datasetUrl = DatasetUrl(datasetName);
	const dataset = await getSolidDataset(datasetUrl, { fetch: fetch });
	return getThing(dataset, `${datasetUrl}#${thingId}`);
}

/**
 * Saves a thing object, to a dataset with specified name
 * Will also create the dataset if it doesn't exist yet!
 *
 * @param datasetName	Name of the dataset to save to
 * @param thing	Object of thing to save
 *
 * @returns	Newly created Thing object
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function saveThing(datasetName: string, thing: any): Promise<any> {
	const datasetUrl = DatasetUrl(datasetName);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let dataset: any;
	try {
		dataset = await getSolidDataset(datasetUrl, { fetch: fetch });
		dataset = setThing(dataset, thing);
		await saveSolidDatasetAt(datasetUrl, dataset, { fetch: fetch });
		return thing;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (e: any) {
		// If dataset doesn't exist yet, repeat functions
		// TODO, specifcy error codes? e.response.status == 404 || e.response.status == 501
		dataset = createSolidDataset();
		//dataset.url =
		await saveSolidDatasetAt(datasetUrl, dataset, { fetch: fetch });
		return saveThing(datasetName, thing);
	}
}

/**
 * Updates data in Thing, Thing selected by id in dataset selected by name
 *
 * @param	datasetName	Name of the dataset to save to
 * @param	thingId		Id/name of the Thing to save to
 * @param	changes		Data to update in the Thing ( @see dataToThing )
 *
 * @returns Promise of @see saveThing
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateSavedThing(datasetName: string, thingId: any, changes: object) {
	const datasetUrl = DatasetUrl(datasetName);
	const dataset = await getSolidDataset(datasetUrl, { fetch: fetch });

	const existingThing = getThing(dataset, `${datasetUrl}#${thingId}`);

	if (!existingThing) return; // TODO: throw error?

	const modifiedThing = dataToThing(buildThing(existingThing), changes);

	return saveThing(datasetName, modifiedThing);
}

/**
 * Removes a saved Thing by id, from dataset found by name
 *
 * @param  datasetName	Name of the dataset where the thing is in
 * @param  thingId	Id/name of the Thing to delete
 *
 * @returns promose of @function saveSolidDatasetAt
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function removeSavedThing(datasetName: string, thingId: any) {
	const datasetUrl = DatasetUrl(datasetName);
	let dataset = await getSolidDataset(datasetUrl, { fetch: fetch });
	const thing = getThing(dataset, `${datasetUrl}#${thingId}`);

	if (!thing) return; // TODO: throw error?

	dataset = removeThing(dataset, thing);
	return saveSolidDatasetAt(datasetUrl, dataset, { fetch: fetch });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function eventUrl(thing: any) {
	return thingUrl('calendar', thing);
}

/**
 * Gets an Event Thing from the calendar dataset
 *
 * @param id Id of the Event/Thing to get
 *
 * @returns Promise of @function getThing
 */
export async function getEvent(id: string) {
	return getThingFromDataset('calendar', id);
}

/**
 * Functions to parse an Event Thing into a clean Javascript object
 *
 * @todo Turn these functions into overloads
 *
 * @param eventId (getAndParseEvent) Id/Name of event to get from calendar dataset
 *
 * @returns Promise of @see thingToData, which should result in a Javascript object from an event
 */
export async function getAndParseEvent(eventId: string) {
	if (!schema.event) return;
	const eventThing = await getEvent(eventId);
	if (!eventThing) return;

	return thingToData(eventThing, schema.event);
}
export async function parseEventThing(eventThing: Thing): Promise<Partial<SchemaEvent>> {
	if (!schema.event) throw Error('shema.event not defined');

	return thingToData(eventThing, schema.event);
}

/**
 * Creates a new Event Thing, saves it to calendar dataset. See https://schema.org/Event for more information.
 *
 * @param 	description		Optional. User side about/description/text
 * @param 	startDate		Start DateTime of event
 * @param	endDate			End DateTime of event
 * @param	location		Optional. Location of the event
 * @param	activityType	Optional. Custom field
 * @param 	id				Optional. Set id for new thing to be created
 *
 * @returns Promise of @function saveThing
 */
export async function saveNewEvent(
	description: string = '',
	startDate: Date,
	endDate: Date,
	location: string = '',
	activityType: string = '',
	notifyOnWeather: string = '',
	id: string = ''
) {
	if (!schema.event) return;

	const thingEvent = newThingBuilder(
		schema.event.self,
		{
			[schema.event.about]: description,
			[schema.event.startDate]: startDate,
			[schema.event.endDate]: endDate,
			[schema.event.location]: location,
			[schema.event.activityType]: activityType,
			[schema.event.notifyOnWeather]: notifyOnWeather
		},
		id
	);

	return saveThing('calendar', thingEvent);
}

/**
 * Updates existing Event Thing
 *
 * @param eventId	Thing id/name of Event Thing to change
 * @param changes	Data to change. @see dataToThing
 *
 * @returns Promise of @see updateSavedThing
 */
export async function updateSavedEvent(eventId: string, changes: object) {
	return updateSavedThing('calendar', eventId, changes);
}

/**
 * Removes existing Event Thing
 *
 * @param eventId	Thing id/name of Event Thing to remove
 *
 * @returns Promise of @see removeSavedThing
 */
export async function removeSavedEvent(eventId: string) {
	return removeSavedThing('calendar', eventId);
}

/**
 * List all Things in a dataset (specified by name)
 *
 * @param datasetName 	Name of the dataset of which to list contents
 *
 * @returns array of
 * 		Console log structure:
 *	 		thing-id-as-string
 *	 		|> thing as object
 *	 		-----
 *	 	  	thing-id-as-string
 *	 		|> thing as object
 *	 		-----
 *
 */
export async function listThingsFromDataset(datasetName: string) {
	const dataset = await getSolidDataset(DatasetUrl(datasetName), { fetch: fetch });
	const things = getThingAll(dataset, {});

	return things;
}

// A function that can be called that tests out the code above!
export async function tester() {
	// Save an event that starts now and ends in two hours
	const start = new Date();
	const end = new Date();
	end.setHours(end.getHours() + 2);

	await saveNewEvent('2 hours, starting now!', start, end, 'here', 'random', 'specificid'); // To be updated
	await saveNewEvent('2 hours, starting now!', start, end, 'here'); // This one just stays
	await saveNewEvent('2 hours, starting now!', start, end); // To be removed

	// Set the first events start and end to now
	// NOTE: don't forget to () your await because otherwise it doesn't work!

	const events = await listThingsFromDataset('calendar');
	console.log(events);
	const firstEventUrl = events[0].url.split('#')[1];
	const thirdEventUrl = events[2].url.split('#')[1];

	console.log('Specifically get first event');
	console.log(await getEvent(events[0].url.split('#')[1]));

	if (!schema.event) return;

	await updateSavedEvent(firstEventUrl, {
		[schema.event.startDate]: new Date(),
		[schema.event.endDate]: new Date(),
		[schema.event.location]: 'Everywhere'
	});
	await removeSavedEvent(thirdEventUrl);

	const firstEventToObject = await getAndParseEvent(firstEventUrl);
	console.log(firstEventToObject);

	console.log(await parseEventThing(events[2]));
}
