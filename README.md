# Kyst: Simple Cryptokitties API Wrapper for NodeJS

## Description
This is a simplistic API wrapper for Cryptokitties. There is one class `KystClient` with basic methods to `get` basic information.

`src/example.js` has a simplistic usage of it listing links of cryptokitties whose current price is less than the calculated median.

## Install:
```shell
npm install kyst
yarn add kyst
```

## Running Example:
This assumes you know nothing about programming.

Steps:
1. Install [NodeJS](https://nodejs.org/).
2. Install [git](https://git-scm.com/).
3. Open your command prompt by typing `cmd` in the search bar for Windows or
Spotlight search `terminal` for OSX.
4. Type `node -v` and `git --version`. You should see their respective version numbers.
5. Navigate to some place where you want to store this repository via `cd <directory>`
If you are in Windows, run `dir` to see a list of directories.
If you are on OSX, run `ls`to see a list of directories.
6. Run the following `git clone https://github.com/lamdaV/kyst.git`.
This clones the repository files to the current directory you are in.
7. Move into the directory by running `cd kyst`.
8. Run `npm install` to download dependencies.
9. Run `node dist/example.js`. This will try to find 10 cryptokitties with a current
price that is less than the median price and with a generation of less than or equal
to 8. This will print out the links to each cryptokitties when done.
10. If you want to change the number of cryptokitties to find, go into `src/example.js`
and find this
```javascript
findNKitties(10) // <--- Change 10 to whatever you want.
  .then((matchedUrls) => {
    console.log("\nFound Kitties: ");
    matchedUrls.forEach((matchedUrl) => console.log(matchedUrl))
  });
```
11. Run `npm run buildall`. This rebuilds all the files. Then, run `node dist/example.js`.

## Contribute:
Feel free to contribute. Fork the repository, make your changes, make a pull request with details of changes, and tag me in it.

## Docs:
**NOTE** All `KystClient` methods return a Promise.

`KystClient.getAuctions(offset, limit, type, status)`

Gets a list of Auction data from Cryptokitties.

##### Params:
- `offset` - integer of Cryptokitties to skip by
- `limit` - integer of Cryptokitties to return between `1` and `100`
- `type` - an element of the set `{ "sales", "sire" }`
- `status` - an element of the set `{ "open", "closed" }`

`KystClient.getKitty(kittyId)`

Gets a Cryptokitties info.

##### Params:
- `kittyId` - integer of the Cryptokittie's identifier

`KystClient.getUser(userAddress)`

##### Params:
- `userAddress` - string of the hex address of the Cryptokittie user

`KystClient.getMetaData()`

Gets Meta Data from `nieldlr` cryptokitties dashboard

`KystClient.getAveragePriceUSD()`

Facade to get the average price in `USD` from the `nieldlr` cryptokitties dashboard.

`KystClient.getMedianPriceUSD()`

Facade to get the median price in `USD` from the `nieldlr` cryptokitties dashboard.

`KystClient.convertUSD2ETH(usd)`

Helper method to convert `USD` to `ETH`.

##### Params:
- `usd` - number of the `USD` value to convert

## Dependencies:
- [nieldlr cryptokitties dashboard](https://kittysales.herokuapp.com/)
- [CoinMarketCap API](https://coinmarketcap.com/)
