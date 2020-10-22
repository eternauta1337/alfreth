const ethers = require('ethers');
const { presentResults, presentError } = require('./utils/present');

const keywords = [
  'unit',
];

const types = [
  "wei",
  "kwei",
  "mwei",
  "gwei",
  "szabo",
  "finney",
  "ether",
];

async function run(alfy, args) {
  // An argument needs to be provided
  if (args.length <= 1) {
    presentError(alfy, 'Please specify a value to convert');
  }
  const value = args[1];

  // Type of conversion is determined by the second argument
  if (args.length <= 2) {
    presentError(alfy, 'Please specify source value type');
  }
  let type = args[2];
  if (type === 'eth') type = 'ether';
  if (!types.includes(type)) {
    presentError(alfy, `Unknown source value type ${type}`);
  }

  // Just convert to all other types
  let results = [];
  types.map(targetType => {
    if (type !== targetType) {
      const weiValue = ethers.utils.parseUnits(value, type);

      let targetValue = +ethers.utils.formatUnits(weiValue, targetType);
      if (targetType >= 1 && targetType % 1 !== 0) targetType = Math.floor(targetValue);

      results.push({
        value: targetType,
        message: `(${targetType}) ${targetValue}`
      });
    }
  });

  // Present
  presentResults(alfy, results);
}

module.exports = {
  keywords,
  run,
};
