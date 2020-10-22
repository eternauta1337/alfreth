function presentResults(alfy, results, options) {
	let idx = 0;

	const items = results.map(item => {
		idx++;

		const shortcut = idx === 1 ? 'enter' : `⌘${idx}`;

		if (item.title) {
			return item;
		} else {
			return {
				title: item.message,
				subtitle: `Press ${shortcut} to copy`,
				valid: true,
				arg: item.value
			};
		}
	});

	alfy.output(items, options);
}

function presentResult(alfy, message, options) {
	alfy.output([{
		title: message
	}]);
}

function presentError(alfy, errorMessage) {
	alfy.output([{
		title: errorMessage
	}]);

	process.exit(1);
}

module.exports = {
	presentResult,
	presentResults,
	presentError,
}
