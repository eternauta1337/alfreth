const keyword = 'gas';

const axios = require('axios');
const ethers = require('ethers');

async function run(alfy) {
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

	const data = result.data;

	data.rapid = `${data.rapid}`;
	data.fast = `${data.fast}`;
	data.standard = `${data.standard}`;
	data.slow = `${data.slow}`;

	function convertUnit(value) {
		return Math.floor(
			ethers.utils.formatUnits(value, 'gwei')
		);
	}

	data.rapid = convertUnit(data.rapid);
	data.fast = convertUnit(data.fast);
	data.standard = convertUnit(data.standard);
	data.slow = convertUnit(data.slow);

	alfy.output([
		{
			title: `Rapid: ${data.rapid} gwei`,
			subtitle: 'Press enter to copy this result',
			valid: true,
			arg: data.rapid,
		},
		{
			title: `Fast: ${data.fast} gwei`,
			subtitle: 'Press ⌘2 to copy this result',
			valid: true,
			arg: data.fast,
		},
		{
			title: `Standard: ${data.standard} gwei`,
			subtitle: 'Press ⌘3 to copy this result',
			valid: true,
			arg: data.standard,
		},
		{
			title: `Slow: ${data.slow} gwei`,
			subtitle: 'Press ⌘4 to copy this result',
			valid: true,
			arg: data.slow,
		},
	]);
}

module.exports = {
	keyword,
	run,
}
