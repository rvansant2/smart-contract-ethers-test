const { ethers } = require('ethers');

/**
 * A class wrapping based off the ethers documentation: https://docs.ethers.org/v5/getting-started/ for ERC20 tokens
 */

class ERC20Token {
  constructor(addressOrENS, provider, abi) {
    this.addressOrENS = addressOrENS;
    this.provider = provider;
    this.abi = abi || [
      'function name() view returns (string)',
      'function symbol() view returns (string)',
      'function balanceOf(address) view returns (uint)',
      'function transfer(address to, unit amount)',
      'event Transfer(address indexed from, address indexed to, unit amount)'
    ];

    this.contract = new ethers.Contract(this.addressOrENS, this.abi, this.provider);
  }

  /**
   * Method to get contract name
   */
  async getName() {
    return await this.contract.name();
  }

  /**
   * Method to get contract symbol
   */
  async getSymbol() {
    return await this.contract.symbol();
  }

  /**
   * Method to get balance of a particular address as a BigNumber
   */
  async getBalance(address) {
    return await this.contract.balanceOf(address);
  }

  /**
   * Method to get a formatted balance of a particular address
   */
  async getFormattedBalance(address, decimals = 18) {
    const balance = await this.getBalance(address);
    return ethers.utils.formatUnits(balance, decimals);
  }

  /**
   * Method to transfer an amount to a particular address
   */
  async transfer(signer, to, amount, decimals = 18) {
    const contractWithSigner = this.contract.connect(signer);
    const parsedAmount = ethers.utils.parseUnits(amount.toString(), decimals);
    return await contractWithSigner.transfer(to, parsedAmount);
  }
}

module.exports = ERC20Token;