const app = require("./app");
const connectDatabase = require("./config/database");
const cloudinary = require("cloudinary");
const PORT = process.env.PORT || 3099;

// rvansantAPITest.js stuff
// import needed libraries and packages
const { ethers } = require('ethers');
const ERC20Token = require('./rvansantAPITest');
// bypassing config variabls with process.env
const INFURA_API_KEY = 'ad25516d4a8346458f07c4453f4d996a';

// connect to provider and instantiate class
const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_API_KEY}`);


// custom route for my class
app.get('/dai', async (req, res) => {
  try {
    const daiAddress = await provider.resolveName('dai.tokens.ethers.eth');
    const holder = await provider.resolveName('ricmoo.firefly.eth');

    const dai = new ERC20Token(daiAddress, provider);

    const name = await dai.getName();
    const symbol = await dai.getSymbol();
    const rawBalance = await dai.getBalance(holder);
    const formatted = await dai.getFormattedBalance(holder);

    console.log(`Token name: ${name}`);
    console.log(`Symbol: ${symbol}`);
    console.log(`Raw Balance (BigNumber): ${rawBalance.toString()}`);
    console.log(`Formatted Balance: ${formatted}`);

    res.json({
      tokenName: name,
      symbol: symbol,
      rawBalance: rawBalance.toString(),
      formattedBalance: formatted
    });
  } catch(err) {
    console.log(`Error: ${err}`);
  }
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(PORT, () => {
  console.log(`Server running`);
});

