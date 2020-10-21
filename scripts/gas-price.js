const keyword = 'gas';

const axios = require('axios');
const ethers = require('ethers');

const TimeAgo = require('javascript-time-ago');
const en = require('javascript-time-ago/locale/en')

let alfy;

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-US');

const presentOptions = {
	rerunInterval: 3
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
		alfy.output([{
			title: 'Unable to fetch gas price from gasnow.org'
		}]);

		return;
	}

	setData(result.data);

	return result.data;
}

function formatGas(gasInGwei) {
	return Math.floor(
		ethers.utils.formatUnits(`${gasInGwei}`, 'gwei')
	);
}

function presentProgress() {
	alfy.output([{
		title: 'Fetching gas info...'
	}], presentOptions);
}

function presentGasData(data, ageSeconds) {
	const date = Date.now() - ageSeconds * 1000;
	const timeUpdated = timeAgo.format(date, 'round');

	alfy.output([
		{
			title: `Rapid: ${formatGas(data.rapid)} gwei`,
			subtitle: 'Press enter to copy this result',
			valid: true,
			arg: data.rapid,
		},
		{
			title: `Fast: ${formatGas(data.fast)} gwei`,
			subtitle: 'Press ⌘2 to copy this result',
			valid: true,
			arg: data.fast,
		},
		{
			title: `Standard: ${formatGas(data.standard)} gwei`,
			subtitle: 'Press ⌘3 to copy this result',
			valid: true,
			arg: data.standard,
		},
		{
			title: `Slow: ${formatGas(data.slow)} gwei`,
			subtitle: 'Press ⌘4 to copy this result',
			valid: true,
			arg: data.slow,
		},
		{
			title: `Gas data updated ${timeUpdated}`,
		}
	], presentOptions);
}

function getData() {
	return alfy.cache.get('gas.data') || undefined;
}

function setData(value) {
	alfy.cache.set('gas.data', value);
}

function prepare(_alfy) {
	alfy = _alfy;
}

function getGasDataAgeSeconds(data) {
	if (!data) {
		return 10000000;
	}

	return (Date.now() - data.timestamp) / 1000;
}

async function run() {
	let data = getData();

	const dataAge = getGasDataAgeSeconds(data);
	if (dataAge > 60 * 5) {
		setData(undefined);
	} else if (dataAge > 30) {
		data = await fetchGasData();
	}

	if (!data) {
		presentProgress();
		await fetchGasData();
	} else {
		presentGasData(data, dataAge);
	}

	await new Promise(() => {});
}

module.exports = {
	keyword,
	prepare,
	run,
}
