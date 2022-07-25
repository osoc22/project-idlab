import { Temporal } from '@js-temporal/polyfill';

type RDFvalue<T> = { '@value': T }[];

interface Address {
	'@id': `https://example.com/Address/${number}_${number}`;
	'@type': ['http://schema.org/PostalAddress'];
}

interface GeoCoordinates {
	'@id': `https://example.com/GeoCoordinates/${number}_${number}`;
	'@type': ['http://schema.org/GeoCoordinates'];
	'http://schema.org/address': Pick<Address, '@id'>[];
	'http://schema.org/latitude': { '@value': `${number}` }[];
	'http://schema.org/longitude': { '@value': `${number}` }[];
}

interface RDFWeatherDay {
	'@id': `https://example.com/WeatherForcecast/${number}`;
	'@type': ['https://uri.fiware.org/ns/data-models#WeatherForcecast'];
	'ex:clouds': RDFvalue<`${number}`>;
	'ex:maximumTemperature': RDFvalue<`${number}`>;
	'ex:minimumTemperature': RDFvalue<`${number}`>;
	'http://schema.org/address'?: Pick<Address, '@id'>[];
	'http://schema.org/identifier': RDFvalue<`${number}`>;
	'https://uri.fiware.org/ns/data-models#feelsLikeTemperature': RDFvalue<`${number}`>;
	'https://uri.fiware.org/ns/data-models#temperature': RDFvalue<`${number}`>;
}

export type RdfWeatherData = Address | GeoCoordinates | RDFWeatherDay;

/**
 * Util to get the value of a RDF value
 * @param value RDFvalue
 * @returns T
 */
function toValue<T>(value: RDFvalue<T>): T {
	if (value.length == 0) throw Error(`Array is empty for: ${value}`);
	return value[0]['@value'];
}

/* Here is the explanation for the code below:
1. We use the `toValue` function to convert the RDFvalue to a string.
2. We use the `parseInt` function to convert the string to a number.
3. We use the `"" +` operator to convert the number to a string.
4. We use the `toValue` function to convert the string to a RDFvalue. */
function toNumber<T>(value: RDFvalue<T>): number {
	return parseInt('' + toValue(value));
}

/* Here is the explanation for the code below:
1. The `toValue` function is called on the RDFvalue.
2. The `toValue` function returns a string.
3. The `parseFloat` function is called on the string.
4. The `parseFloat` function returns a number. */
function toFloat<T>(value: RDFvalue<T>): number {
	return parseFloat('' + toValue(value));
}

export class WeatherDay {
	id: number;
	clouds: number;
	minimumTemperature: number;
	maximumTemperature: number;
	feelsLikeTemperature: number;
	temperature: number;

	constructor(
		id: number,
		clouds: number,
		minimumTemperature: number,
		maximumTemperature: number,
		feelsLikeTemperature: number,
		temperature: number
	) {
		this.id = id;
		this.clouds = clouds;
		this.minimumTemperature = minimumTemperature;
		this.maximumTemperature = maximumTemperature;
		this.feelsLikeTemperature = feelsLikeTemperature;
		this.temperature = temperature;
	}

	get temporalDate(): Temporal.PlainDate {
		const d = new Date(this.id * 1000);
		return new Temporal.PlainDate(d.getFullYear(), d.getMonth() + 1, d.getDate());
	}

	static fromRDF(rdf: RDFWeatherDay): WeatherDay {
		const id = toNumber(rdf['http://schema.org/identifier']);
		const clouds = toNumber(rdf['ex:clouds']);
		const minimumTemperature = toNumber(rdf['ex:minimumTemperature']);
		const maximumTemperature = toNumber(rdf['ex:maximumTemperature']);
		const feelsLikeTemperature = toNumber(
			rdf['https://uri.fiware.org/ns/data-models#feelsLikeTemperature']
		);
		const temperature = toNumber(rdf['https://uri.fiware.org/ns/data-models#temperature']);

		return new WeatherDay(
			id,
			clouds,
			minimumTemperature,
			maximumTemperature,
			feelsLikeTemperature,
			temperature
		);
	}
}

export class Weather {
	geoCoordinates: { longitude: number; latitude: number };
	days: WeatherDay[];

	constructor(geoCoordinates: { longitude: number; latitude: number }, days: WeatherDay[]) {
		this.geoCoordinates = geoCoordinates;
		this.days = days;
	}

	getWeatherDataFor(day: Temporal.PlainDate): WeatherDay | undefined {
		return this.days.find((d) => d.temporalDate.equals(day));
	}

	static fromRDF(rdfDataArray: RdfWeatherData[]): Weather {
		const geoCoordinates = { longitude: 0, latitude: 0 };
		const days: WeatherDay[] = [];

		rdfDataArray.forEach((rdfData) => {
			const rdfType = rdfData['@type'][0];

			if (rdfType == 'https://uri.fiware.org/ns/data-models#WeatherForcecast') {
				const weatherData = WeatherDay.fromRDF(rdfData as RDFWeatherDay);
				days.push(weatherData);
			}

			if (rdfType == 'http://schema.org/GeoCoordinates') {
				const weatherCoordinates = rdfData as GeoCoordinates;
				geoCoordinates.latitude = toFloat(weatherCoordinates['http://schema.org/latitude']);
				geoCoordinates.longitude = toFloat(weatherCoordinates['http://schema.org/longitude']);
			}
		});

		return new Weather(geoCoordinates, days);
	}
}
