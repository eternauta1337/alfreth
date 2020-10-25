const ethers = require('ethers');

const keyword = 'gas';
const syntax = '';
const description = 'Gets gas prices from gasnow.org';

async function run(alfy) {
	const response = await alfy.fetch(
		'https://www.gasnow.org/api/v3/gas/price?utm_source=:alfreth'
	);

	if (!response || response.code !== 200) {
		throw new Error(`Unable to fetch gas data. Error ${response.code}`);
	}

	const data = response.data;

	function addResult(rawValue, label, results) {
		const value = Math.floor(ethers.utils.formatUnits(`${rawValue}`, 'gwei'));

		results.push({
			arg: value,
			title: `${value} gwei`,
			subtitle: label
		});
	}

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
