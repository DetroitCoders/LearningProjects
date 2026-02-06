function calcTip() {
    var billAmount = parseFloat(document.getElementById('inputBillAmount').value);
    var service = parseFloat(document.getElementById('inputService').value);
    var numOfPeople = parseFloat(document.getElementById('numOfPeople').value);

    var isValid = validate(billAmount, service, numOfPeople);
    if(isValid) {
      var tip = billAmount * service;
      var totalBill = tip + billAmount;
      var totalBillPerPerson = totalBill / numOfPeople;
      var id = guid();

      var ansBlock1 = document.createElement('p');
      ansBlock1.innerText = "Your tip total is: " + tip;

      var ansBlock2 = document.createElement('p');
      ansBlock2.innerText = "Your total amount is: " + totalBill;

      var ansBlock3 = document.createElement('p');
      ansBlock3.innerText = "Your bill per person is: " + totalBillPerPerson;

      var deleteButton = document.createElement('button');
      deleteButton.setAttribute("type", "button");
      deleteButton.setAttribute("class", "btn btn-danger");
      var deleteId = "deleteTip(\'" + id + "\')";
      deleteButton.setAttribute("onclick", deleteId);
      deleteButton.innerText = "Delete";

      var ansDiv = document.createElement('div');
      ansDiv.setAttribute("class", "container bg-dark text-white");
      ansDiv.setAttribute("id", id);
      var horzDivide = document.createElement('hr');

      ansDiv.appendChild(ansBlock1);
      ansDiv.appendChild(ansBlock2);
      ansDiv.appendChild(ansBlock3);
      ansDiv.appendChild(deleteButton);
      ansDiv.appendChild(horzDivide);

      document.getElementById('tipCalcContainer').appendChild(ansDiv);
    }
}

function validate(billAmount, service, numOfPeople) {
  var isTrue = false;

  if((!isNaN(billAmount)) && (!isNaN(service)) && (!isNaN(numOfPeople))) {
    isTrue = true;
  }

  return isTrue;
}

function deleteTip(id) {
  var child = document.getElementById(id);
  child.parentNode.removeChild(child);
}

function guid() {
    return (
      s4() +
      s4() +
      s4()
    );
  }

  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }