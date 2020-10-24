const ethers = require('ethers');

const keywords = ['block'];

const description = 'Get latest block info';

async function run(alfy) {
	const providerUrl = alfy.config.get('provider');

	let provider;
	if (providerUrl) {
		provider = new ethers.providers.JsonRpcProvider(providerUrl);
	} else {
		provider = ethers.getDefaultProvider();
	}

	const blockNum = await provider.getBlockNumber();
	const block = await provider.getBlock(blockNum);

	const time = new Date(block.timestamp * 1000);
	const gasLimit = block.gasLimit.toString();

	alfy.output([
	  {
	  	title: blockNum,
	  	subtitle: 'block number',
	  	arg: blockNum,
	  	valid: true,
	  },
	  {
	  	title: block.hash,
	  	subtitle: 'hash',
	  	arg: block.hash,
	  	valid: true,
	  },
	  {
	  	title: time,
	  	subtitle: 'time',
	  	arg: time,
	  	valid: true,
	  },
	  {
	  	title: gasLimit,
	  	subtitle: 'gas limit',
	  	arg: gasLimit,
	  	valid: true,
	  }
	]);
}

module.exports = {
  keywords,
  description,
  run,
};
