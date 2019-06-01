function calcTip() {
    var billAmount = document.getElementById('inputBillAmount').value;
    var service = document.getElementById('inputService').value;

    var answer = billAmount * service;
    var ansBlock = document.createElement('p');
    ansBlock.innerText = "Your tip total is: " + answer;
    document.getElementById('answerBlock').appendChild(ansBlock);
}