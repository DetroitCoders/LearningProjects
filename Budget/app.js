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
})();
