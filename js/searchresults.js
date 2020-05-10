class SearchResults {
  constructor() {}

  load() {
    this.resultsWrapper.innerHTML = "";
  }
}

document.getElementById("searchInput").addEventListener("click", stock);
const resultsWrapper = document.getElementById("resultList");
let searchInput = document.getElementById("searchBox");

function showLoader() {
  document.getElementById("loader").classList.remove("disapear");
}
function hideLoader() {
  document.getElementById("loader").classList.add("disapear");
}

function stock() {
  let searchStock = document.getElementById("searchBox").value;
  stockExchange(searchStock);
}

function stockExchange(searchStock) {
  showLoader();
  fetch(
    `https://financialmodelingprep.com/api/v3/search?query=${searchStock}&limit=10&exchange=NASDAQ`
  )
    .then(response => {
      return response.json();
    })
    .then(data => {
      generateResults(data);
      hideLoader();
    });
}

const generateResults = data => {
  resultsWrapper.innerHTML = "";
  data.map(stocks => getStockDetails(stocks));
};

const getStockDetails = data => {
  fetch(
    `https://financialmodelingprep.com/api/v3/company/profile/${data.symbol}`
  )
    .then(response => {
      return response.json();
    })
    .then(newInfo => {
      const listNumber = document.createElement("li");
      listNumber.classList.add("list-group-item");
      listLogo = document.createElement("img");
      listLogo.classList.add("company-logo");
      listLogo.src = newInfo.profile.image;

      listSymbol = document.createElement("span");
      listSymbol.classList.add("symbolStyling");
      listSymbol.classList.add("ml-2");
      listSymbol.innerHTML = "(" + data.symbol + ")";

      listName = document.createElement("a");
      listName.href = `./company.html?symbol=${data.symbol}`;
      listName.innerHTML = data.name;
      listName.classList.add("ml-2");

      listPercentage = document.createElement("span");
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

      listNumber.append(listLogo, listName, listSymbol, listPercentage);
      resultsWrapper.append(listNumber);
    });
};

function debounce(func, wait, immediate) {
  let timeout;
  return function() {
    let context = this,
      args = arguments;
    let later = function() {};
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const debounceFunction = debounce(function() {
  stock();
}, 1000);
searchInput.addEventListener("keyup", debounceFunction);
