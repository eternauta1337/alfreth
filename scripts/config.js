const keyword = 'config';
const syntax = '';
const description = 'Shows Alfreth\'s config variables';

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
  syntax,
	description,
};
