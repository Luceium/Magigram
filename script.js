var nameInputElem = document.getElementById("input");
var letterBankElem = document.getElementById("letter-bank");
nameInputElem.addEventListener("blur", function() {
    newName();
});

function resetPage(){}

function newName(){
    resetPage();
    var inputName = nameInputElem.value;
    letterBankElem.innerText = getLetters(inputName);
}

function getLetters(input){
    //clean text
    input = input.toLowerCase();
    input = input.replace(/[^a-zA-Z]*/g, "");//only keeps letters
    console.log(input);

    //sort
    var letters = input.split("");
    letters.sort()
    input = letters.join('');

    return input;
}