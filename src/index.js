const KystClient = require("./KystClient");

const CONVERSION_FACTOR = 10 ** -18

const findNKitties = (n) => {
  const client = new KystClient();
  const kittyBaseUrl = "https://www.cryptokitties.co/kitty"

  const find = (found, offset, limit) => {
    console.log(`found ${found} offset ${offset} limit ${limit}`)
    if (found >= n) {
      return Promise.resolve([]);
    }

    return client.getMedianPriceUSD()
      .then((medianPriceUSD) => client.convertUSD2ETH(medianPriceUSD)
        .then((medianPriceETH) => client.getAuctions(offset, limit, "sale", "open")
          .then((response) => {
            return response.auctions
              .map((auction) => {
                auction.eth = auction.current_price * CONVERSION_FACTOR;
                return auction;
              })
              .filter((auction) => auction.eth <= medianPriceETH)
              .map((buyAuction) => buyAuction.kitty)
              .filter((buyKitty) => buyKitty.generation <= 8)
              .map((buyKitty) => `${kittyBaseUrl}/${buyKitty.id}`)
          })
          .then((matchedUrls) => {
            // console.log(matchedUrls);
            const discover = matchedUrls.length;
            return find(found + discover, offset + limit, limit)
              .then((otherMatchedUrls) => matchedUrls.concat(otherMatchedUrls));
          })));
  }

  return find(0, 0, 10);
}

findNKitties(10)
  .then((matchedUrls) => {
    console.log("\nFound Kitties: ");
    matchedUrls.forEach((matchedUrl) => console.log(matchedUrl))
  });
