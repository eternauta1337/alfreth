const alfy = require('alfy');

let scripts = [
	require('./scripts/unit'),
	require('./scripts/convert'),
	require('./scripts/gas-price'),
	require('./scripts/block'),
	require('./scripts/config'),
	require('./scripts/ens'),
];

(async () => {
	if (!alfy.input) {
		return;
	}

	// Input fully encloses the keyword of a script => run the script
	let script = scripts.find(script => alfy.input.includes(script.keyword));
	if (script) {
		const args = alfy.input.split(' ').filter(token => token !== script.keyword);
		await script.run(alfy, args);

		return;
	}

	// Input is 'help' => describe all scripts
	if (alfy.input === 'help') {
		const results = scripts.map(script => {
			return {
				title: script.keyword + ' ' + script.syntax,
				subtitle: script.description,
			}
		});

		alfy.output(results);

		return;
	}

	// The keyword of a script fully encloses input => show script description
	script = scripts.find(script => script.keyword.includes(alfy.input));
	if (script) {
		alfy.output([{
			title: script.keyword + ' ' + script.syntax,
			subtitle: script.description,
		}]);

		return;
	}
})();
