const ethers = require('ethers');

const keyword = 'unit';
const syntax = '<value> <source type>';
const description = 'Converts a numeric value into different units';

const types = [
  "wei",
  "kwei",
  "mwei",
  "gwei",
  "szabo",
  "finney",
  "ether",
];

function presentMessage(alfy, message) {
  alfy.output([{
    title: keyword,
    subtitle: message
  }]);

  process.exit(0);
}

async function run(alfy, args) {
  // An argument needs to be provided
  if (args.length < 1) {
    presentMessage(alfy, 'Specify a value to convert');
  }
  const value = args[0];

  // Type of conversion is determined by the second argument
  if (args.length < 2) {
    presentMessage(alfy, 'Specify source value type');
  }
  let type = args[1];
  if (type === 'eth') type = 'ether';

  // Just convert to all other types
  let results = [];
  types.map(targetType => {
    if (type !== targetType) {
      const weiValue = ethers.utils.parseUnits(value, type);

      let targetValue = +ethers.utils.formatUnits(weiValue, targetType);
      if (targetType >= 1 && targetType % 1 !== 0) targetType = Math.floor(targetValue);

      results.push({
        title: targetValue,
        subtitle: targetType,
        arg: targetType,
      });
    }
  });

  // Present
  alfy.output(results);
}

module.exports = {
  keyword,
  description,
  run,
  syntax,
};
