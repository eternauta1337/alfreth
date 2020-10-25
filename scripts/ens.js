const ethers = require('ethers');
const getProvider = require('./utils/getProvider');

const keyword = 'ens';
const description = 'Get ens address'

async function run(alfy, args) {
  if (args.length < 1) {
    alfy.output([{
      title: keyword,
      subtitle: 'Specify address or ens'
    }]);

    return;
  }

	let result;
	const arg = args[0];

	const provider = getProvider(alfy);
	if (ethers.utils.isAddress(arg)) {
		result = await provider.lookupAddress(arg);

		if (!result) {
			alfy.output([{
				title: 'Unable to resolve address'
			}]);

			return;
		}
	} else {
		result = await provider.resolveName(arg);

		if (!result) {
			alfy.output([{
				title: 'Unable to resolve name'
			}]);

			return;
		}
	}

	alfy.output([{
		title: result,
		arg: result,
		valid: true,
	}]);
}

module.exports = {
	keyword,
	run,
	description,
};
