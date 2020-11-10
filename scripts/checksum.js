const ethers = require('ethers');

const keyword = 'checksum';
const syntax = '<address>';
const description = 'Calculate the checksum of an address'

async function run(alfy, args) {
  if (args.length < 1) {
    alfy.output([{
      title: keyword,
      subtitle: 'Specify an address'
    }]);

    return;
  }

	let result;
	const arg = args[0];

	if (ethers.utils.isAddress(arg)) {
		result = ethers.utils.getAddress(arg);
	} else {
    alfy.output([{
      title: keyword,
      subtitle: 'Specified address is invalid'
    }]);

    return;
	}

	alfy.output([{
		title: result,
		subtitle: 'Checksum address',
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
