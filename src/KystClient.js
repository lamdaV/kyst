import rp from "request-promise";

export const DEFAULT_URL = "https://api.cryptokitties.co";
export const META_STATS_URL = "https://kittysales.herokuapp.com/data";
export const EXCHANGE_URL = "https://api.coinmarketcap.com/v1/ticker/ethereum"
export const CONVERSION_FACTOR = 10 ** -18

export class KystClient {
  buildOptions(uri) {
    return {
      uri: uri,
      headers: {
        "User-Agent": "Request-Promise"
      },
      json: true
    };
  }

  getAuctions(offset, limit, type, status) {
    let options = this.buildOptions(`${DEFAULT_URL}/auctions`);
    options.qs = {
      offset: offset,
      limit: limit,
      type: type,
      status: status
    };
    return rp(options);
  }

  getKitty(kittyId) {
    let options = this.buildOptions(`${DEFAULT_URL}/kitties/${kittyId}`);
    return rp(options);
  }

  getUser(userAddress) {
    let options = this.buildOptions(`${DEFAULT_URL}/user/${userAddress}`);
    return rp(options);
  }

  getMetaData() {
    let options = this.buildOptions(META_STATS_URL);
    options.qs = {offset: 0, count: 1};
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
    let options = this.buildOptions(EXCHANGE_URL);
    options.qs = {convert: "USD"};
    return rp(options)
      .then((conversion) => conversion[0].price_usd)
      .then((rate) => usd / rate);
  }
}

export default KystClient;
