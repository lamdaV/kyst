const KystClient = require("./KystClient");

const CONVERSION_FACTOR = 10 ** -18

const findNKitties = (n) => {
  const client = new KystClient();

  const find = (found, offset, limit) => {
    if (found >= n) {
      return;
    }

    client.getMedianPriceUSD()
      .then((medianPriceUSD) => client.convertUSD2ETH(medianPriceUSD)
        .then((medianPriceETH) => client.getAuctions(offset, limit, "sale", "open")
          .then((response) => {
            return response.auctions
              .map((auction) => {
                auction.eth = auction.current_price * CONVERSION_FACTOR;
                return auction;
              })
              .filter((auction) => auction.eth <= medianPriceETH)
              .map((buyAuction) => `https://www.cryptokitties.co/kitty/${buyAuction.kitty.id}`)
          })
          .then((matchedUrls) => {
            console.log(matchedUrls);
            const discover = matchedUrls.length;
            find(found + discover, offset + limit, limit);
          })));
  }

  find(0, 0, 10);
}

findNKitties(3);
