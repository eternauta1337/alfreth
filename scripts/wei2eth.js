const ethers = require('ethers');

module.exports = ({ value }) => {
	return ethers.utils.formatEther(value);
};
