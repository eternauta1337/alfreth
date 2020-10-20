const ethers = require('ethers');

const keyword = 'convert';

function run(args) {
  const value = args.find(arg => !isNaN(arg));
  if (!value) {
    return ['Please specify a value to convert'];
  }

  let specifiedUnits = [];
  args.map(arg => {
    units.map(unit => {
      if (arg === 'eth') arg = 'ether';

      if (unit === arg) {
        specifiedUnits.push(arg);
      }
      {}});
  });

  if (specifiedUnits.length === 0) {
    return ['Please specify valid conversion units'];
  } else if (specifiedUnits.length === 1) {
    return ['Please specify a valid destination unit'];
  }

  const from = specifiedUnits[0];
  const to = specifiedUnits[1];

  const wei = ethers.utils.parseUnits(value, from);

  let dest = ethers.utils.formatUnits(wei, to);
  if (dest > 1) dest = Math.floor(dest);

  return [{
    title: `${value} ${from} = ${dest} ${to}`,
    arg: dest,
    valid: true,
    subtitle: 'Press enter to copy the result to the clipboard',
  }];
}

const units = [
  'wei',
  'kwei',
  'Kwei',
  'babbage',
  'femtoether',
  'mwei',
  'Mwei',
  'lovelace',
  'picoether',
  'gwei',
  'Gwei',
  'shannon',
  'nanoether',
  'nano',
  'szabo',
  'microether',
  'micro',
  'finney',
  'milliether',
  'milli',
  'ether',
  'kether',
  'grand',
  'mether',
  'gether',
  'tether',
];

module.exports = {
  keyword,
  run,
};
