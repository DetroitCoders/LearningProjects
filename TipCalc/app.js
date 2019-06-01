function calcTip() {
    var billAmount = parseFloat(document.getElementById('inputBillAmount').value);
    var service = parseFloat(document.getElementById('inputService').value);
    var numOfPeople = parseFloat(document.getElementById('numOfPeople').value);

    var tip = billAmount * service;
    var totalBill = tip + billAmount;
    var totalBillPerPerson = totalBill / numOfPeople;

    var ansBlock1 = document.createElement('p');
    ansBlock1.innerText = "Your tip total is: " + tip;

    var ansBlock2 = document.createElement('p');
    ansBlock2.innerText = "Your total amount is: " + totalBill;

    var ansBlock3 = document.createElement('p');
    ansBlock3.innerText = "Your bill per person is: " + totalBillPerPerson;

    var ansDiv = document.createElement('div');
    ansDiv.setAttribute("class", "container bg-dark text-white");

    ansDiv.appendChild(ansBlock1);
    ansDiv.appendChild(ansBlock2);
    ansDiv.appendChild(ansBlock3);

    document.getElementById('tipCalcContainer').appendChild(ansDiv);
}