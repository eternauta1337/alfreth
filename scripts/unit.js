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
    title: keyword + ' ' + syntax,
    subtitle: message
  }]);

  process.exit(0);
}

async function run(alfy, args) {
  if (args.length < 1) {
    presentMessage(alfy, 'Specify a value to convert');
  }
  const value = args[0];

  if (args.length < 2) {
    presentMessage(alfy, 'Specify source value type');
  }
  let type = args[1];
  if (type === 'eth') type = 'ether';

  if (!types.includes(type)) {
    type = 'ether';
  }

  let results = [];
  types.map(targetType => {
    const valueWei = ethers.utils.parseUnits(value, type);
    let valueTarget = ethers.utils.formatUnits(valueWei, targetType);

    const removeTrailingZeroes = /^0*(\d+(?:\.(?:(?!0+$)\d)+)?)/;
    valueTarget = valueTarget.match(removeTrailingZeroes)[1];

    results.push({
      title: valueTarget,
      subtitle: targetType,
      arg: valueTarget,
    });
  });

  alfy.output(results);
}

module.exports = {
  keyword,
  description,
  run,
  syntax,
};
