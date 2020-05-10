class Company {
  constructor(symbol, location) {
    this.symbol = symbol;
    this.location = location;
    this.url = `https://financialmodelingprep.com/api/v3/company/profile/${this.symbol}`;
    this.urlChart = `https://financialmodelingprep.com/api/v3/historical-price-full/${this.symbol}?serietype=line`;
    this.companyCard = document.createElement("div");
    this.companyCard.className =
      "card shadow p-3 mb-5 bg-white rounded company-card";
    this.chartLocation = document.createElement("div");
    this.chartLocation.className =
      "card shadow p-3 mb-5 bg-white rounded company-card";
    this.loadInformation();
  }

  async loadInformation() {
    await this.fetchInformation();
    await this.fetchChart();
  }
  async fetchInformation() {
    let response = await fetch(this.url);
    let data = await response.json();
    let object = data.profile;

    let sectionOne = document.createElement("div");
    sectionOne.className += "promo-section";

    let companyLogo = document.createElement("img");
    companyLogo.classList.add("companyLogo");
    companyLogo.src = object.image;

    let companyName = document.createElement("h1");
    companyName.className = "companyName";
    companyName.innerText = object.companyName;

    let companyWebsite = document.createElement("a");
    companyWebsite.className = "companyWebsiteInformation";
    companyWebsite.href = object.website;
    companyWebsite.innerHTML = object.website;

    let companyInformation = document.createElement("div");
    companyInformation.className = "companyInformation";
    companyInformation.innerText = object.description;

    let companyCurrentStock = document.createElement("div");
    companyCurrentStock.className = "companyCurrentStock";

    let companyStockPrice = document.createElement("span");
    companyStockPrice.className = "companyStockPrice";
    companyStockPrice.innerHTML = "<b>" + object.price + "$</b>";

    let companyStockDifference = document.createElement("span");
    companyStockDifference.className = "companyStockDifference";
    companyStockDifference.innerHTML = object.changesPercentage;
    if (object.changesPercentage.includes("-") === true) {
      companyStockDifference.classList.add("red");
    } else companyStockDifference.classList.add("green");

    companyCurrentStock.append(companyStockPrice, companyStockDifference);
    sectionOne.append(
      companyLogo,
      companyName,
      companyWebsite,
      companyCurrentStock,
      companyInformation
    );
    this.companyCard.append(sectionOne);
    this.location.append(this.companyCard);
  }

  async fetchChart() {
    let response = await fetch(this.urlChart);
    let data = await response.json();

    let stockChart = document.createElement("canvas");
    this.chartLocation.append(stockChart);
    let ctx = stockChart.getContext("2d");

    let myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [],
        datasets: [
          {
            label: "Stock Price History ",
            data: [],
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
          },
        ],
      },
      options: {},
    });

    const yearlength = data.historical.length / 365;
    let yeardecimal = 2020 - yearlength;
    let year = Math.round(yeardecimal);
    for (let i = 0; i < data.historical.length; i++) {
      if (data.historical[i].date.slice(0, 4) === year.toString()) {
        myChart.data.labels.push(year);
        myChart.data.datasets[0].data.push(data.historical[i].close);
        year = year + 1;
      }
    }
    this.location.append(this.chartLocation);
    myChart.update();
  }
}

new Marquee();
