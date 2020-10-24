const URL = require('url').URL;

const keywords = ['provider'];

description = 'Set provider url';

function isValidUrl(url) {
	try {
		new URL(url);
		return true;
	} catch (err) {
		return false;
	}
}

function presentError(alfy, error) {
  alfy.output([{
    title: error
  }]);

  process.exit(0);
}

async function run(alfy, args) {
  // An argument needs to be provided
  if (args.length <= 2) {
    presentError(alfy, 'Please specify a provider url');
  }

  const url = args[2];
  if (!isValidUrl(url)) {
    presentError(alfy, 'Invalid url');
  }

  alfy.config.set('providerUrl', url);

  alfy.output([{
  	title: 'Provider url set'
  }]);
}

module.exports = {
	run,
	keywords,
	description,
};
