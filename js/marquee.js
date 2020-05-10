class Marquee {
  constructor() {
    this.fetchMarqueeUrl();
  }

  async fetchMarqueeUrl() {
    const URlMarquee = `https://financialmodelingprep.com/api/v3/stock/real-time-price`;
    var response = await fetch(URlMarquee);
    var data = await response.json();
    var stockPrice = data.stockList;
    stockPrice.map((stock) => {
      let marquee = document.getElementById("marquee");
      let marqueeContainer = document.createElement("div");
      let marqueeSymbol = document.createElement("span");
      let marqueePrice = document.createElement("span");
      marqueeContainer.classList.add("mx-2");
      marqueeSymbol.classList.add("mx-1");
      marqueeSymbol.innerHTML = stock.symbol;
      marqueePrice.innerHTML = `$${stock.price}`;
      marqueePrice.classList.add("green");
      marqueeContainer.append(marqueeSymbol, marqueePrice);
      marquee.append(marqueeContainer);
    });
  }
}
