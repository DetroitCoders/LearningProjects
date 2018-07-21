var activeBudget;

function draw() {
  console.log("- My Budget -");
  console.log("-------------");

  activeBudget
    .getItems()
    .forEach(item =>
      console.log(item.id + " - " + item.description + " - " + item.value)
    );

  console.log("-------------");
  console.log(activeBudget.getTotal());
}

class Budget {
  constructor() {
    this.items = [];
  }

  addItem(budgetItem) {
    this.items.push(budgetItem);
  }

  removeItem(itemId) {
    let item = this.items.find(item => item.id === itemId);
    if (item === null) return;

    let itemIndex = this.items.indexOf(item);
    if (itemIndex === -1) return;

    this.items.splice(itemIndex, 1);
  }

  getItems() {
    return this.items;
  }

  getTotal() {
    var total = 0;
    this.items.forEach(item => {
      total += item.value;
    });

    return total;
  }
}

class BudgetItem {
  constructor(description, value) {
    this.id = +new Date();
    this.description = description;
    this.value = value;
  }
}

(function() {
  console.log("Hello From Budget!");
  activeBudget = new Budget();

  // Bootstrap with sample data
  activeBudget.addItem(new BudgetItem("Cell Phone", 80));

  setTimeout(() => {
    activeBudget.addItem(new BudgetItem("Rent", 800));
  }, 1000);

  setTimeout(() => {
    activeBudget.addItem(new BudgetItem("Soda", 15.75));
  }, 2000);

  setTimeout(() => draw(), 2250);

  // Trial: Creating Dynamic HTML
  setTimeout(() => {
    var tree = document.createDocumentFragment();
    var itemlist = activeBudget.getItems();

    // Row 1 setup
    var div1 = document.createElement("div");
    div1.setAttribute("class", "row");

    var div1col1 = document.createElement("div");
    div1col1.setAttribute("class", "col");
    div1col1.innerHTML = itemlist[0].id;
    var div1col2 = document.createElement("div");
    div1col2.setAttribute("class", "col-6");
    div1col2.innerHTML = itemlist[0].description;
    var div1col3 = document.createElement("div");
    div1col3.setAttribute("class", "col");
    div1col3.innerHTML = itemlist[0].value;

    div1.appendChild(div1col1);
    div1.appendChild(div1col2);
    div1.appendChild(div1col3);

    // Row 2 setup
    var div2 = document.createElement("div");
    div2.setAttribute("class", "row");

    var div2col1 = document.createElement("div");
    div2col1.setAttribute("class", "col");
    div2col1.innerHTML = itemlist[1].id;
    var div2col2 = document.createElement("div");
    div2col2.setAttribute("class", "col-6");
    div2col2.innerHTML = itemlist[1].description;
    var div2col3 = document.createElement("div");
    div2col3.setAttribute("class", "col");
    div2col3.innerHTML = itemlist[1].value;

    div2.appendChild(div2col1);
    div2.appendChild(div2col2);
    div2.appendChild(div2col3);

    // Row 3 setup
    var div3 = document.createElement("div");
    div3.setAttribute("class", "row");

    var div3col1 = document.createElement("div");
    div3col1.setAttribute("class", "col");
    div3col1.innerHTML = itemlist[2].id;
    var div3col2 = document.createElement("div");
    div3col2.setAttribute("class", "col-6");
    div3col2.innerHTML = itemlist[2].description;
    var div3col3 = document.createElement("div");
    div3col3.setAttribute("class", "col");
    div3col3.innerHTML = itemlist[2].value;

    div3.appendChild(div3col1);
    div3.appendChild(div3col2);
    div3.appendChild(div3col3);

    // Add all 3 rows to main div
    tree.appendChild(div1);
    tree.appendChild(div2);
    tree.appendChild(div3);
    document.getElementById("main").appendChild(tree);
    }, 5000);
})();
