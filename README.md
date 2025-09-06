# smart-contract-ethers-test

Just a simple connection to an Ethereum smart contract on the public mainnet to gather information and output the information via JSON via a defined route using ethers.

The base of this code is from a fork of: `https://bitbucket.org/screening_challenge_assessment/mike_dex_challenge/src/main/`, which was given.

## Requirements
- node ^v22.x.x
- npm ^v10.5.1

## Quick start
- Clone [repo](https://github.com/rvansant2/smart-contract-ethers-test) via git clone command `git clone git@github.com:rvansant2/smart-contract-ethers-test.git`
- Change into repo directory via command `cd smart-contract-ethers-test`
- Grab all project packages defined in the `package.json` by running `npm install`
- Run express server via command `npm start` then go to `http://localhost:3099/`
    - Ensure that the server is running via terminal and by going to the above URL.
- To get the information gathered from a public smart contract, go to the defined endpoint and URL: `http://localhost:3099/dai`.
    - You should see a JSON example output of the following:
    ```
    {
    "tokenName": "Dai Stablecoin",
    "symbol": "DAI",
    "rawBalance": "0",
    "formattedBalance": "0.0"
  }

## Updates/Edits/Additional files made
- server/rvansantAPITest.js (new)
- package.json (updates)
- package-lock.json (updates)
- index.js (updates)

## Work done
- Added a new class that leverages ethers to connect to a given address or ENS. This class is a simple implemenation of the `ERC20 token` examples given in the documentation and has basic functionality to get standard metadata associated.
- This new class is instantiated and put under an `express` route for direct access.
- This is implemented in `index.js`, per the instructions. Otherwise, a defined route should be created under the `routes` directory.

## Issues/work-arounds
- Console logging was suppressed so the metadata was outputted as JSON.
- Environment variables were not working at intended and based off the documentation in the code, so a constant defintion was used as a work-around.
