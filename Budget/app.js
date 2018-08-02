var activeBudget;

window.addEventListener('budgetChange', function() {
  draw();
});

function draw() {
  console.log('-'.repeat(75));
  console.log(' '.repeat(35) + 'Budget');
  console.log('-'.repeat(75));
  console.log('ID' + ' '.repeat(35) + '| Description     | Value');
  activeBudget
    .getItems()
    .forEach(item =>
      console.log(
        item.id +
          ' | ' +
          item.description.padEnd(15) +
          ' | ' +
          formatCurrency(item.value)
      )
    );

  console.log(
    'Total'.padEnd(55) + '| ' + formatCurrency(activeBudget.getTotal())
  );
  console.log('-'.repeat(75));

  drawHtml();
}

function drawHtml() {
  var tree = document.createDocumentFragment();

  activeBudget.getItems().forEach(item => {
    var tr = document.createElement('tr');

    var colDescription = document.createElement('td');
    colDescription.innerHTML = item.description;

    var colValue = document.createElement('td');
    colValue.classList.add('has-text-right');
    colValue.innerHTML = formatCurrency(item.value);

    var colRemove = document.createElement('td');
    var btn = document.createElement("button");
    var t = document.createTextNode("Remove");
    btn.appendChild(t);
    colRemove.appendChild(btn); 

    tr.appendChild(colDescription);
    tr.appendChild(colValue);
    tr.appendChild(colRemove);

    tree.appendChild(tr);
  });

  var tblItems = document.getElementById('tblItems');

  while (tblItems.firstChild) {
    tblItems.removeChild(tblItems.firstChild);
  }

  tblItems.appendChild(tree);
  document.getElementById('lblTotal').innerText = formatCurrency(
    activeBudget.getTotal()
  );
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'USD'
  }).format(value);
}

class Budget {
  constructor() {
    this.items = [];
  }

  onBudgetChange() {
    window.dispatchEvent(new Event('budgetChange'));
  }

  addItem(budgetItem) {
    this.items.push(budgetItem);
    this.onBudgetChange();
  }

  removeItem(itemId) {
    let item = this.items.find(item => item.id === itemId);
    if (item === null) return;

    let itemIndex = this.items.indexOf(item);
    if (itemIndex === -1) return;

    this.items.splice(itemIndex, 1);

    this.onBudgetChange();
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
    this.id = this.guid();
    this.description = description;
    this.value = value;
  }

  guid() {
    return (
      this.s4() +
      this.s4() +
      '-' +
      this.s4() +
      '-' +
      this.s4() +
      '-' +
      this.s4() +
      '-' +
      this.s4() +
      this.s4() +
      this.s4()
    );
  }

  s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
}

(function() {
  console.log('Hello From Budget!');
  activeBudget = new Budget();

  // Bootstrap with sample data
  activeBudget.addItem(new BudgetItem('Cell Phone', 80));
  activeBudget.addItem(new BudgetItem('Rent', 800));
  activeBudget.addItem(new BudgetItem('Soda', 15.75));
})();
