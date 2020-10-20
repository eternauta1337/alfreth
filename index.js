const alfy = require('alfy');

let scripts = [
	require('./scripts/convert'),
	require('./scripts/gas-price'),
];

let script = scripts.find(script => alfy.input.includes(script.keyword));

if (script) {
	const args = alfy.input.split(' ').filter(token => token !== script.keyword);
	await script.run(alfy, args);
}
