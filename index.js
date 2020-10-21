const alfy = require('alfy');

let scripts = [
	require('./scripts/convert'),
	require('./scripts/gas-price'),
];

let script = scripts.find(script => {
	return script.keywords.some(keyword => {
		return alfy.input.includes(keyword);
	});
});

if (script) {
	script.prepare(alfy);

	const args = alfy.input.split(' ').filter(token => token !== script.keyword);
	await script.run(args);
}
