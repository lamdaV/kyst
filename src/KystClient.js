import rp from "request-promise";
import cheerio from "cheerio";

export const DEFAULT_URL = "https://api.cryptokitties.co";
export const META_STATS_URL = "https://kittysales.herokuapp.com/data";
export const EXCHANGE_URL = "https://api.coinmarketcap.com/v1/ticker/ethereum"
export const CATTRIBUTE_URL = "https://cryptokittydex.com/";
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

  getCAttributes() {
    const C_ATTRIBUTE_PARENT_TAG= "div.col-md-8.text-center";
    let options = this.buildOptions(CATTRIBUTE_URL);
    return rp({uri: "https://cryptokittydex.com/"})
      .then((html) => {
        const $ = cheerio.load(html);
        return Promise.resolve($(C_ATTRIBUTE_PARENT_TAG).children()
          .map((index, child) => $(child).text().trim()));
      })
      .then((data) => {
        return Promise.resolve(data.get()
          .map((line) => {
            let data = line.split(/\s+/);
            let output = {};
            output[data[0]] = parseInt(data[1].replace(",", ""));
            return output;
          }));
      })
      .then((attributes) => Promise.resolve(Object.assign({}, ...attributes)));
  }
}

export default KystClient;
