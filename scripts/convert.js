const ethers = require('ethers');

const keywords = [
  'convert',
  'unit'
];

let alfy;

function prepare(_alfy) {
  alfy = _alfy;
}

async function run(args) {
  const value = args.find(arg => !isNaN(arg));
  if (!value) {
    alfy.output([{
      title: 'Please specify a value to convert'
    }]);

    return;
  }

  let specifiedUnits = [];
  args.map(arg => {
    units.map(unit => {
      if (arg === 'eth') arg = 'ether';

      if (unit === arg) {
        specifiedUnits.push(arg);
      }
    });
  });

  if (specifiedUnits.length === 0) {
    alfy.output([{
      title: 'Please specify valid conversion units'
    }]);

    return;
  }

  const from = specifiedUnits[0];
  let to;

  if (specifiedUnits.length <= 1) {
    if (from === 'ether') to = 'wei';
    else if (from === 'wei') to = 'ether';
  } else {
    to = specifiedUnits[1];
  }

  const wei = ethers.utils.parseUnits(value, from);

  let dest = ethers.utils.formatUnits(wei, to);
  if (dest > 1) dest = Math.floor(dest);

  alfy.output([{
    title: `${value} ${from} = ${dest} ${to}`,
    arg: dest,
    valid: true,
    subtitle: 'Press enter to copy the result',
  }]);
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
  keywords,
  prepare,
  run,
};
