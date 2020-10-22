const keywords = ['gas'];

const axios = require('axios');
const ethers = require('ethers');
const { presentResult, presentResults, presentError } = require('./utils/present');

const TimeAgo = require('javascript-time-ago');
const en = require('javascript-time-ago/locale/en')

let alfy;

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-US');

const presentOptions = {
	rerunInterval: 2
};

async function fetchGasData() {
	let errored = false;

	const response = await axios.get(
		'https://www.gasnow.org/api/v3/gas/price?utm_source=:alfreth'
	).catch(() => errored = true);

	if (response.status !== 200) errored = true;
	if (!response.data) errored = true;

	const result = response.data;

	if (errored) {
		presentError(alfy, 'Unable to fetch gas price from gasnow.org');
	}

	setData(result.data);

	return result.data;
}

function formatGas(gasInGwei) {
	return Math.floor(ethers.utils.formatUnits(`${gasInGwei}`, 'gwei'));
}

function addResult(value, label, results) {
	results.push({
		value,
		message: `${label}: ${value} gwei`
	});
}

function presentGasData(data, ageSeconds) {
	const date = Date.now() - ageSeconds * 1000;
	const timeUpdated = timeAgo.format(date, 'round');

	let results = [];

	addResult(formatGas(data.rapid), 'Rapid', results);
	addResult(formatGas(data.fast), 'Fast', results);
	addResult(formatGas(data.standard), 'Standard', results);
	addResult(formatGas(data.slow), 'Slow', results);

	results.push({
		title: `Gas data updated ${timeUpdated}`
	});

	presentResults(alfy, results, presentOptions);
}

function getData() {
	return alfy.cache.get('gas.data') || undefined;
}

function setData(value) {
	alfy.cache.set('gas.data', value);
	return value;
}

function getGasDataAgeSeconds(data) {
	if (!data) return 10000000;
	return (Date.now() - data.timestamp) / 1000;
}

async function run(_alfy) {
	alfy = _alfy;

	// Get cached data
	let data = getData();
	const dataAge = getGasDataAgeSeconds(data);
	if (data) {
		// If data is super old, throw it away
		// If slightly old, fetch new data in the bg
		if (dataAge > 60 * 5) {
			data = setData(undefined);
		} else if (dataAge > 10) {
			fetchGasData(); // Intentionally not awaiting
		}
	}

	// If no data by this point, show something, and fetch data
	if (!data) {
		presentResult(
			alfy,
			'Fetching gas data...',
			presentOptions
		);

		fetchGasData(); // Intentionally ont awaiting
	} else { // If there is that to present shot it
		presentGasData(data, dataAge);
	}
}

module.exports = {
	keywords,
	run,
}
