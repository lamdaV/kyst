# Kyst: Simple Cryptokitties API Wrapper for NodeJS

## Description
This is a simplistic API wrapper for Cryptokitties. There is one class `KystClient` with basic methods to `get` basic information.

`src/index.js` has a simplistic usage of it listing links of cryptokitties whose current price is less than the calculated median.

## Install:
It is not hosted on `npm` yet. You will have to clone the repository or use the git repository address within your `package.json` for now.

## Contribution:
Feel free to contribute. Fork the repository, make your changes, make a pull request with details of changes, and tag me in it.

## Docs:
** NOTE ** All `KystClient` methods return a Promise.

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
