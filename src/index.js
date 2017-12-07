const progress = require("cli-progress");

const KystClient = require("./KystClient");

const CONVERSION_FACTOR = 10 ** -18

const findNKitties = (n) => {
  const client = new KystClient();
  const kittyBaseUrl = "https://www.cryptokitties.co/kitty"

  const progressFormat = "searching... [{bar}] {percentage}% | {value} / {total} | {duration}s"
  const progressBar = new progress.Bar({format: progressFormat, stopOnComplete: true});
  progressBar.start(n, 0);

  // source: https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const find = (found, offset, limit) => {
    if (found >= n) {
      progressBar.update(n);
      return Promise.resolve([]);
    }
    progressBar.update(found);

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
          .catch((error) => {
            // console.log("[ ERROR ]", error.message);
            return sleep(5000)
              .then(() => find(found, offset, limit));
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
