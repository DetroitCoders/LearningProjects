var activeCalculator;

function onChanges() {
  var takeHomePay = window.document.getElementById("takeHomePay").value;
  activeCalculator.taxRate = window.document.getElementById("taxRate").value;

  var result = activeCalculator.calculate(takeHomePay);

  window.document.getElementById("grossToCharge").innerText = formatCurrency(
    result.grossToCharge
  );
  window.document.getElementById("tithing").innerText = formatCurrency(
    result.tithing
  );
  window.document.getElementById("taxes").innerText = formatCurrency(
    result.taxes
  );
  window.document.getElementById("taxRateText").innerText = formatPercent(
    activeCalculator.taxRate
  );
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD"
  }).format(value);
}

function formatPercent(value) {
  return value * 100 + "%";
}

function init() {
  window.document.getElementById("taxRate").value = activeCalculator.taxRate;
}

(function() {
  console.log("Hello From Calculator!");

  class Calculator {
    constructor() {
      this.tithingRate = 0.1;
      this.taxRate = 0.15;
    }

    calculate(takeHomePay) {
      let grossToCharge = this.getGrossToCharge(takeHomePay);
      let tithing = this.getTithing(grossToCharge);
      let taxes = this.getTaxes(grossToCharge);

      console.log("Take Home: " + takeHomePay);
      console.log("Charge Them: " + grossToCharge);
      console.log("Tithing: " + tithing);
      console.log("Taxes: " + taxes);

      return { grossToCharge, tithing, taxes };
    }

    getGrossToCharge(takeHomePay) {
      var divisor = this.getDivisor();
      var grossToCharge = (1 / divisor) * takeHomePay;
      return this.round(grossToCharge);
    }

    getDivisor() {
      var divisor = 1;
      divisor -= this.tithingRate;
      divisor -= this.taxRate;
      return divisor;
    }

    getTithing(grossToCharge) {
      var tithing = grossToCharge * this.tithingRate;
      return this.round(tithing);
    }

    getTaxes(grossToCharge) {
      var taxes = grossToCharge * this.taxRate;
      return this.round(taxes);
    }

    round(numberToRound) {
      return Math.round(numberToRound * 100) / 100;
    }
  }

  activeCalculator = new Calculator();
  init();
  onChanges();
})();
