let letterBank = new Map();

const nameInputElem = document.getElementById("input");
const letterBankElem = document.getElementById("letter-bank");
const searchedWordElem = document.getElementById("searched-word");

nameInputElem.addEventListener("blur", function() {
    resetPage();
    var inputName = nameInputElem.value;
    getLetters(inputName);
    letterBankElem.innerText = mapToString();
});

searchedWordElem.addEventListener("blur", function() {
    if (!takeWord(searchedWordElem.value)){
        alert("Letters could not be found in your letter bank");
        searchedWordElem.value = "";
    } else {
        letterBankElem.innerText = mapToString();
    }
})

function resetPage(){
    letterBank = new Map();
}

function cleanText(input){
    input = input.toLowerCase();
    input = input.replace(/[^a-zA-Z]*/g, "");//only keeps letters
    console.log(input);
    return input;
}

function  sortLetters(input){
    return input.split('').sort().join('');
}

function getLetters(input){
    input = cleanText(input);
    input = sortLetters(input);

    //input into map
    var letters = input.split("");
    letters.forEach(letter => {
        if (letterBank.has(letter)){
            letterBank.set(letter,
                letterBank.get(letter) + 1
            );
        } else {
            letterBank.set(letter, 1);
        }
    });

    console.log(letters + " -> " + letterBank);
}

function mapToString() {
    var letterStr = "";
    letterBank.forEach((value, key, map) => { // the key and values are swapped also there is an undefined char
        console.log("k:"+ key + " ~ " + "v:"+value);
        letterStr += key.repeat(value);
    })

    return letterStr;
}

function takeWord(inputWord){//Do I have to reset the word map???
    inputWord = cleanText(inputWord);

    //build map of letters in input Word
    var wordLetters = inputWord.split("");
    var wordBank = new Map();
    wordLetters.forEach(element => {
        if (wordBank.has(element)){
            wordBank.set(element,
                wordBank.get(element) + 1
            );
        } else {
            wordBank.set(element, 1);
        }
    });

    //checks if word is able to be taken out of letter bank
    wordBank.forEach((value,key) => {
        console.log("k:"+ key + " ~ " + "v:"+value);
       //if there are less of a letter than in the word to remove return false
       console.log(letterBank.get(key) + " < " + value + ": " + (!letterBank.get(key) || letterBank.get(key) < value))
        if (!letterBank.get(key) || letterBank.get(key) < value) {
            return false;
        }
    });

    //remove letters from word out of letter bank
    wordBank.forEach((value,key) => {
        letterBank.set(key, letterBank.get(key) - value);
    });
    
    return true;
}

function test(){
    console.log("hi".repeat(4))
}