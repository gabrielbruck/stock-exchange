class SearchResults {
  constructor(elements, resultList) {
    this.Companies = document.getElementById("CompareClasses");
    this.Companies.className =
      "card shadow p-3 mb-5 bg-white rounded company-card";
    this.spinner = elements.loader;
    this.searchInput = elements.searchInput;
    this.searchBox = elements.searchBox;
    this.resultList = resultList;
  }

  launchSearch() {
    this.stockExchange(this.searchBox.value);
  }

  showElement(element) {
    element.classList.remove("disapear");
  }

  hideElement(element) {
    element.classList.add("disapear");
  }

  clearElement(element) {
    element.innerHTML = "";
    element.value = "";
  }

  // Comparing Companies
  compareBox() {
    let startComparing = document.createElement("button");
    startComparing.className = "btn btn-outline-primary compareCompanies";

    startComparing.type = "button";
    startComparing.innerText = "Compare Company";

    this.Companies.append(startComparing);
  }
  compareCompany(buttonElement) {
    let compareCompanies = document.createElement("div");
    compareCompanies.className =
      "alert alert-primary fade show selected comparing";
    compareCompanies.classList.add("comparing");
    compareCompanies.innerHTML = buttonElement;

    let exitCompanies = document.createElement("button");
    exitCompanies.className = "close exitCompany";
    exitCompanies.type = "button";
    exitCompanies.setAttribute("aria-label", "close");
    exitCompanies.setAttribute("data-dismiss", "alert");

    compareCompanies.append(exitCompanies);
    this.Companies.append(compareCompanies);
  }

  // Initialize Search for Company
  stockExchange(searchStock) {
    this.showElement(this.spinner);
    let url = `https://financialmodelingprep.com/api/v3/search?query=${searchStock}&limit=10&exchange=NASDAQ`;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.clearElement(this.searchBox);
        this.clearElement(this.resultList);
        data.map((stocks) => this.getStockDetails(stocks));
        this.hideElement(this.spinner);
      });
  }

  // Show Result of Companies
  getStockDetails = (data) => {
    fetch(
      `https://financialmodelingprep.com/api/v3/company/profile/${data.symbol}`
    )
      .then((response) => {
        return response.json();
      })
      .then((newInfo) => {
        let listNumber = document.createElement("li");
        listNumber.classList.add("list-group-item");

        let listContent = document.createElement("span");
        listContent.classList.add("list-content");

        let listLogo = document.createElement("img");
        listLogo.classList.add("company-logo");
        listLogo.src = newInfo.profile.image;
        if (listLogo === null) {
          listLogo.src = "";
        }

        let listSymbol = document.createElement("span");
        listSymbol.classList.add("symbolStyling");
        listSymbol.classList.add("ml-2");
        listSymbol.innerHTML = "(" + data.symbol + ")";

        let listName = document.createElement("a");
        listName.href = `./company.html?symbol=${data.symbol}`;
        listName.innerHTML = data.name;
        listName.classList.add("ml-2");

        let listPercentage = document.createElement("span");
        listPercentage.innerHTML = newInfo.profile.changesPercentage;
        listPercentage.classList.add("ml-2");
        listPercentage.classList.add("percentageStyling");
        const number = newInfo.profile.changesPercentage.slice(1, -1);
        listPercentage.textContent = `${number}`;

        if (number[0] === "+") {
          listPercentage.classList.add("green");
        }
        if (number[0] === "-") {
          listPercentage.classList.add("red");
        }

        let buttonContent = document.createElement("span");
        buttonContent.classList.add("d-flex");
        buttonContent.classList.add("button-container");

        let buttonCompare = document.createElement("button");
        buttonCompare.classList.add("btn");
        buttonCompare.classList.add("btn-primary");
        buttonCompare.innerText = "Compare";
        buttonCompare.id = data.symbol;
        buttonCompare.addEventListener("click", () => {
          this.compareCompany(buttonCompare.id);
        });

        listContent.append(listLogo, listName, listSymbol, listPercentage);
        buttonContent.append(buttonCompare);
        listNumber.append(listContent, buttonContent);

        let content = new Mark(listContent);
        content.mark(this.searchBox.value, {
          element: "span",
          className: "highlight",
        });
        this.resultList.append(listNumber);
      });
  };
}
