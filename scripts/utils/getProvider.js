const ethers = require('ethers');

function getProvider(alfy) {
	const providerUrl = alfy.config.get('provider');

	let provider;
	if (providerUrl) {
		provider = new ethers.providers.JsonRpcProvider(providerUrl);
	} else {
		provider = ethers.getDefaultProvider();
	}

	return provider;
}

module.exports = getProvider;
