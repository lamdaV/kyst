const rp = require("request-promise");

const DEFAULT_URL = "https://api.cryptokitties.co";
const META_STATS_URL = "https://kittysales.herokuapp.com/data";
const EXCHANGE_URL = "https://api.coinmarketcap.com/v1/ticker/ethereum/"

const CONVERSION_FACTOR = 10 ** -18

class KystClient {
  getAuctions(offset, limit, type, status) {
    const options = {
        uri: `${DEFAULT_URL}/auctions`,
        qs: {
          offset: offset,
          limit: limit,
          type: type,
          status: status
        },
        headers: {
          "User-Agent": "Request-Promise"
        },
        json: true
    };
    return rp(options);
  }

  getKitty(kittyId) {
    const options = {
      uri: `${DEFAULT_URL}/kitties/${kittyId}`,
      headers: {
        "User-Agent": "Request-Promise"
      },
      json: true
    };
    return rp(options);
  }

  getUser(userAddress) {
    const options = {
      uri: `${DEFAULT_URL}/user/${userAddress}`,
      headers: {
        "User-Agent": "Request-Promise"
      },
      json: true
    };
    return rp(options);
  }

  getMetaData() {
    const options = {
      uri: META_STATS_URL,
      qs: {
        offset: 0,
        count: 1
      },
      json: true
    };
    return rp(options);
  }

  getAveragePriceUSD() {
    return this.getMetaData()
      .then((meta) => meta.stats)
      .then((stats) => stats.avgSale);
  }

  getMedianPriceUSD() {
    return this.getMetaData()
      .then((meta) => meta.stats)
      .then((stats) => stats.medianSale);
  }

  convertUSD2ETH(usd) {
    const options = {
      uri: EXCHANGE_URL,
      qs: {
        convert: "USD"
      },
      json: true
    };
    return rp(options)
      .then((conversion) => conversion[0].price_usd)
      .then((rate) => usd / rate);
  }
}

module.exports = KystClient;
