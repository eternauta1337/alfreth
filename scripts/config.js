const keywords = ['config'];

description = 'View config variables';

async function run(alfy, args) {
	alfy.output([
		{
			title: alfy.config.get('providerUrl'),
			subtitle: 'providerUrl'
		}
	]);
}

module.exports = {
	run,
	keywords,
	description,
};
