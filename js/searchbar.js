class SearchBar {
  constructor(element) {
    this.element = element;
    this.inputStock();
  }

  inputStock() {
    let CompareContainer = document.createElement("div");
    CompareContainer.className = "searchBar";
    let SearchContainer = document.createElement("div");
    SearchContainer.className = "searchBar";
    let Input = document.createElement("input");
    Input.className = "searchBox";
    Input.id = "searchBox";
    Input.value = "";
    Input.placeholder = "Search stock...";
    Input.type = "text";
    // Input.addEventListener("keyup", this.debounceFunction);
    let Button = document.createElement("button");
    Button.className = "btn btn-light fa fa-search";
    Button.id = "searchInput";
    Button.type = "button";
    let Loader = document.createElement("div");
    Loader.className = "disapear spinner-border text-dark";
    Loader.id = "loader";
    Loader.role = "status";

    SearchContainer.append(Input, Button, Loader);
    CompareContainer.append(SearchContainer);
    this.element.append(SearchContainer);
  }

  returnObjects() {
    return {
      loader: document.getElementById("loader"),
      searchInput: document.getElementById("searchInput"),
      searchBox: document.getElementById("searchBox"),
    };
  }
}
