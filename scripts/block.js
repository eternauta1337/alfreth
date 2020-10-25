const getProvider = require('./utils/getProvider');

const keyword = 'block';
const syntax = '';
const description = 'Get latest block info';

async function run(alfy) {
	const provider = getProvider(alfy);

	const block = await provider.getBlock();

	const time = new Date(block.timestamp * 1000);
	const gasLimit = block.gasLimit.toString();

	alfy.output([
	  {
	  	title: block.number,
	  	subtitle: 'block number',
	  	arg: block.number,
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
  keyword,
  syntax,
  description,
  run,
};
