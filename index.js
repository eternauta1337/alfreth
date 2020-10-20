const alfy = require('alfy');

let scripts = [
	require('./scripts/convert'),
];

scripts.map(
	script => {
		if (alfy.input.includes(script.keyword)) {
			const args = alfy.input.split(' ').filter(token => token !== script.keyword);

			const results = script.run(args);

			const items = results.map(result => {
				if (typeof result === 'object') return result;
				else return {
					title: result
				};
			})

			alfy.output(items);
		}
	}
);
