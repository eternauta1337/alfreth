const ethers = require('ethers');

const keywords = ['convert'];
const description = 'Converts a value into multiple formats';

async function run(alfy, args) {
  // An argument needs to be provided
  if (args.length <= 2) {
    presentError(alfy, 'Please specify a value to convert');
  }

  // Type of conversion is determined by the first argument
  const value = args[2];

  // Just try to convert to all types and fuck it cause yolo
  let results = [];
  tryConvertToUint(value, results);
  tryConvertToString(value, results);
  tryConvertToBytes32(value, results);

  // Present
  alfy.output(results);
}

function tryConvertToBytes32(value, results) {
  try {
    const bytes32Value = ethers.utils.formatBytes32String(value);

    results.push({
      title: bytes32Value,
      subtitle: 'bytes32',
      arg: bytes32Value,
    });
  } catch(err) {}
};

function tryConvertToUint(value, results) {
  try {
    const uintValue = ethers.BigNumber.from(value).toString();

    results.push({
      title: uintValue,
      subtitle: 'uint',
      arg: uintValue,
    });
  } catch(err) {}
};

function tryConvertToString(value, results) {
  try {
    const stringValue = ethers.utils.toUtf8String(value);

    results.push({
      title: stringValue,
      subtitle: 'string',
      arg: stringValue,
    })
  } catch(err) {}
}

module.exports = {
  keywords,
  description,
  run,
};
