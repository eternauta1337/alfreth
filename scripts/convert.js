const ethers = require('ethers');
const { presentResults, presentError } = require('./utils/present');

const keywords = [
  'convert',
];

async function run(alfy, args) {
  // An argument needs to be provided
  if (args.length <= 1) {
    presentError(alfy, 'Please specify a value to convert');
  }

  // Type of conversion is determined by the first argument
  const value = args[1];

  // Just try to convert to all types and fuck it cause yolo
  let results = [];
  tryConvertToUint(value, results);
  tryConvertToString(value, results);

  // Present
  presentResults(alfy, results);
}

function tryConvertToUint(value, results) {
  try {
    const uintValue = ethers.BigNumber.from(value).toString();

    results.push({
      value: uintValue,
      message: `${uintValue} (uint)`
    });
  } catch(err) {}
};

function tryConvertToString(value, results) {
  try {
    const stringValue = ethers.utils.toUtf8String(value);

    results.push({
      value: stringValue,
      message: `${stringValue} (string)`
    })
  } catch(err) {}
}

module.exports = {
  keywords,
  run,
};
