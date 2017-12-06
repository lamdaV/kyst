const KystClient = require("./KystClient");

client = new KystClient();

const CONVERSION_FACTOR = 10 ** -18
client.getMedianPriceUSD()
  .then((medianPriceUSD) => client.convertUSD2ETH(medianPriceUSD)
    .then((medianPriceETH) => client.getAuctions(0, 10, "sale", "open")
      .then((response) => {
        return response.auctions
          .map((auction) => {
            auction.eth = auction.current_price * CONVERSION_FACTOR;
            return auction;
          })
          .filter((auction) => auction.eth <= medianPriceETH)
          .map((buyAuction) => buyAuction.kitty.id)
          .map((kittyId) => `https://www.cryptokitties.co/kitty/${kittyId}`)
      })
      .then((matchedUrls) => console.log(matchedUrls))));
