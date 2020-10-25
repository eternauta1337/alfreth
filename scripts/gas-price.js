const axios = require('axios');
const ethers = require('ethers');

const keyword = 'gas';
const syntax = '';
const description = 'Gets gas prices from gasnow.org';

async function run(alfy) {
	const response = await axios.get(
		'https://www.gasnow.org/api/v3/gas/price?utm_source=:alfreth'
	);

	function addResult(rawValue, label, results) {
		const value = Math.floor(ethers.utils.formatUnits(`${rawValue}`, 'gwei'));

		results.push({
			arg: value,
			title: `${value} gwei`,
			subtitle: label
		});
	}

	const data = response.data.data;

	let results = [];
	addResult(data.rapid, 'Rapid', results);
	addResult(data.fast, 'Fast', results);
	addResult(data.standard, 'Standard', results);
	addResult(data.slow, 'Slow', results);

	alfy.output(results);
}

module.exports = {
	keyword,
	description,
  syntax,
	run,
}
