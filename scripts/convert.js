const ethers = require('ethers');

const keyword = 'convert';
const syntax = '<value>';
const description = 'Converts a value into multiple other formats';

async function run(alfy, args) {
  if (args.length < 1) {
    alfy.output([{
      title: keyword + ' ' + syntax,
      subtitle: 'Specify a value to convert'
    }]);

    return;
  }

  const value = args[0];

  let results = [];
  tryConvertToUint(value, results);
  tryConvertToString(value, results);
  tryConvertToBytes32(value, results);

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
  keyword,
  description,
  syntax,
  run,
};
