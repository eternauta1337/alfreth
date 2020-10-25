const ethers = require('ethers');
const getProvider = require('./utils/getProvider');

const keyword = 'ens';
const syntax = '<address | name>';
const description = 'Get resolves ENS addresses and names'

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
		const isValidDomainRegex = /^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})$/
		if (isValidDomainRegex.test(arg)) {
			result = await provider.resolveName(arg);

			if (!result) {
				alfy.output([{
					title: 'Unable to resolve name'
				}]);

				return;
			}
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
  syntax,
	description,
};
