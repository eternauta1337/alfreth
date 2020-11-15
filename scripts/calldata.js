const ethers = require('ethers');
const axios = require('axios');

const keyword = 'calldata';
const syntax = '<contract> <calldata>';
const description = 'Check contract calldata using Etherscan'

// Docs: https://etherscan.io/apis
const ETHERSCAN_API = `https://api.etherscan.io/api`;
const defaultApikey = `391YIKRFHH8PANTHRX482KKHSUMBA3NPMF`;

async function run(alfy, args) {
  // Make sure contract address is specified
  if (args.length < 1) {
    alfy.output([{
      title: keyword,
      subtitle: 'Specify a contract address'
    }]);

    return;
  }

	const contractAddress = args[0];

	if (!ethers.utils.isAddress(contractAddress)) {
    alfy.output([{
      title: keyword,
      subtitle: 'Invalid contract address'
    }]);

    return;
	}

	// Try to read specified calldata
	let calldata = '';
	if (args.length > 1) {
		calldata = args[1];

		if (!ethers.utils.isHexString(calldata)) {
    	alfy.output([{
      	title: keyword,
      	subtitle: `Invalid calldata ${calldata}`
    	}]);

    	return;
		}
	}

  // Retrieve source code (with abi) from Etherscan.
  // Note: could fetch ABI directly, but this brings in additional data.
  const response = await axios.get(ETHERSCAN_API, {
    params: {
      module: 'contract',
      action: 'getsourcecode',
      address: contractAddress,
      apiKey: defaultApikey,
    }
  });
  const result = response.data.result;
  const data = result[0];
  const contractName = data.ContractName;
  const abi = JSON.parse(data.ABI);

  // Extract function selector from calldata.
  const selector = calldata.slice(2, 10);

  // Sweep ABI items of type 'function' and find a match with the selector.
  let matchingAbiItem = abi.find(abiItem => {
    if (abiItem.type === 'function') {
      const signature = `${abiItem.name}(${abiItem.inputs.map(input => input.type).join(',')})`;
      const signatureHash = ethers.utils.id(signature).slice(2, 10);

      return signatureHash === selector;
    }
  })

  if (!matchingAbiItem) {
    alfy.output([{
      title: keyword,
      subtitle: `Unable to find a matching function call for selector ${selector} in the retrieved ABI.`
    }]);

    return;
  }

  // Decode calldata.
  const payload = `0x${calldata.slice(10, calldata.length)}`;
  const types = matchingAbiItem.inputs.map(input => input.type);
  const decoded = ethers.utils.defaultAbiCoder.decode(types, payload);

	const results = [];

	results.push({
		title: contractName,
		subtitle: 'Contract name',
		arg: contractName,
		valid: true,
	});

	results.push({
		title: contractAddress,
		subtitle: 'Contract address',
		arg: contractAddress,
		valid: true,
	});

	results.push({
		title: matchingAbiItem.name,
		subtitle: 'Function to call',
		arg: matchingAbiItem.name,
		valid: true,
	});

  let idx = 0;
  matchingAbiItem.inputs.map(input => {
    const entry = decoded[idx].toString();
    idx++;

    results.push({
		  title: entry,
		  subtitle: `${input.name}: ${input.type}`,
		  arg: entry,
		  valid: true,
    });
  });

	alfy.output(results);
}

module.exports = {
	keyword,
	run,
  syntax,
	description,
};
