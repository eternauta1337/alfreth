const keyword = 'token';
const description = 'Find tokens in Uniswap\'s default token list';
const syntax = '<name | symbol>'

const listUrl = 'https://wispy-bird-88a7.uniswap.workers.dev/?url=http://tokens.1inch.eth.link';

async function run(alfy, args) {
	const tokens = await getData(alfy);

  if (args.length < 1) {
    alfy.output([{
      title: keyword + ' ' + syntax,
      subtitle: 'Specify a token name or symbol'
    }]);

    return;
  }

	const query = args[0].toLowerCase();

	const token = tokens.find(token => {
		return token.name.toLowerCase() === query || token.symbol.toLowerCase() === query
	});

	if (token) {
		alfy.output([
			{
				title: token.name,
				subtitle: 'name',
				valid: true,
				arg: token.name,
			},
			{
				title: token.symbol,
				subtitle: 'symbol',
				valid: true,
				arg: token.name,
			},
			{
				title: token.address,
				subtitle: 'address',
				valid: true,
				arg: token.address,
			},
			{
				title: token.decimals,
				subtitle: 'decimals',
				valid: true,
				arg: token.decimals,
			},
		]);

		return;
	}

	const results = tokens.filter(token => {
		return token.name.toLowerCase().includes(query) || token.symbol.toLowerCase().includes(query)
	});

	if (results.length === 0) {
		alfy.output([{
			title: `No matches for ${query}`
		}]);

		return;
	}

	let output = [{
		title: 'No matches. Did you mean any of these?'
	}];

	output = output.concat(
		results.map(token => {
			return {
				title: `${token.name} (${token.symbol})`,
			}
		})
	);

	alfy.output(output);
}

async function getData(alfy) {
	let data = alfy.cache.get('token.data');
	let needsFetch = true;
	if (data) {
		data = JSON.parse(data);

		if (data.fetchedTimestamp) {
			const timestamp = new Date(data.fetchedTimestamp);
			const ageSeconds = Math.floor(Date.now() - timestamp.getTime()) / 1000;
			if (ageSeconds < 3600) {
				needsFetch = false;
			}
		}
	}

	if (needsFetch) {
		data = await alfy.fetch(listUrl);
		data.fetchedTimestamp = new Date();

		if (!data || !data.name) {
			throw new Error(`Unable to fetch token data`);
		}

		alfy.cache.set('token.data', JSON.stringify(data));
	}

	return data.tokens.filter(token => token.chainId === 1);
}

module.exports = {
	run,
	keyword,
	description,
	syntax,
};
