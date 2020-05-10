const newMarquee = new Marquee();
const searchBar = new SearchBar(document.getElementById("search-Bar"));
const resultlist = document.getElementById("resultList");
const searchresults = new SearchResults(searchBar.returnObjects(), resultList);
searchresults.compareBox();

const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("click", () => {
  searchresults.launchSearch();
});
