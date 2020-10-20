const ethers = require('ethers');

module.exports = ({ value }) => {
	return ethers.utils.parseEther(value).toString();
};
