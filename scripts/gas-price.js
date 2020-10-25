const axios = require('axios');
const ethers = require('ethers');

const keywords = ['gas'];

const description = 'Gets gas prices from gasnow.org';

async function run(alfy) {
	let errored = false;

	const response = await axios.get(
		'https://www.gasnow.org/api/v3/gas/price?utm_source=:alfreth'
	).catch(() => errored = true);

	if (response.status !== 200) errored = true;
	if (!response.data) errored = true;

	if (errored) {
		alfy.output([{
			title: 'Unable to fetch gas price from gasnow.org'
		}]);

		return;
	}

	function formatGas(gasInGwei) {
		return Math.floor(ethers.utils.formatUnits(`${gasInGwei}`, 'gwei'));
	}

	function addResult(value, label, results) {
		results.push({
			arg: value,
			title: `${value} gwei`,
			subtitle: label
		});
	}

	const data = response.data.data;

	let results = [];
	addResult(formatGas(data.rapid), 'Rapid', results);
	addResult(formatGas(data.fast), 'Fast', results);
	addResult(formatGas(data.standard), 'Standard', results);
	addResult(formatGas(data.slow), 'Slow', results);

	alfy.output(results);
}

module.exports = {
	keywords,
	description,
	run,
}
