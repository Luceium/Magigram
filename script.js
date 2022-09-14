var nameInputElem = document.getElementById("input");
var letterBankElem = document.getElementById("letter-bank");

function resetPage(){}

function newName(){
  resetPage();
  var inputName = nameInputElem.innerText;
  letterBankElem.innerText = getLetters(inputName);
  
}

function getLetters(input){
  //clean text
  input = input.toLowerCase();
  input.replace(/[^a-zA-Z]*/g, "");//only keeps letters
  console.log(input);
  
  //sort
  var letters = input.split("");

  return input;
}