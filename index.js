const alfy = require('alfy');

let scripts = [
	require('./scripts/unit'),
	require('./scripts/convert'),
	require('./scripts/gas-price'),
	require('./scripts/block'),
	require('./scripts/provider'),
];

let script = scripts.find(script => {
	return script.keywords.some(keyword => {
		return alfy.input.includes(keyword);
	});
});

if (script) {
	const args = alfy.input.split(' ').filter(token => token !== script.keyword);
	await script.run(alfy, args);
} else {
	alfy.output(scripts.map(script => {
		return {
			title: script.keywords[0],
			subtitle: script.description,
		};
	}));
}
