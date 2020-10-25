const keyword = 'config';
description = 'View config variables';

async function run(alfy) {
	alfy.output([
		{
			title: alfy.config.get('providerUrl'),
			subtitle: 'providerUrl'
		}
	]);
}

module.exports = {
	run,
	keyword,
	description,
};
