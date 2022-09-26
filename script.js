let letterBank = new Map();

const nameInputElem = document.getElementById("input");
const letterBankElem = document.getElementById("letter-bank");
const searchedWordElem = document.getElementById("searched-word");
const generatedWordsDivElem = document.getElementById("generated-words-container");
const selectedWordsElem = document.getElementById("selected-words-container");

nameInputElem.addEventListener("blur", function() {
    resetPage();
    var inputName = nameInputElem.value;
    getLetters(inputName);
    letterBankElem.innerText = mapToString();
});

searchedWordElem.addEventListener("blur", function() {
    var input = searchedWordElem.value;
    if (input.indexOf(" ") != -1) {
        input.split(" ").forEach((word) => {takeWordEventHandler(word);})
    }
    takeWordEventHandler(input);
})

function takeWordEventHandler(searchedWord) {
    if (!searchedWord) {return false;}
    if (!takeWord(searchedWord)){
        generatedWordsDivElem.innerText = "The word you requested to remove has letters that aren't in your word bank. As of now the synonym feature has not been implemented. My sincere apologies."
    } else {
        generatedWordsDivElem.innerText = "";
        letterBankElem.innerText = mapToString();

        //add taken word to list of words
        selectedWordsElem.appendChild(createWord(searchedWord));
    }
    searchedWordElem.value = "";
}

function createWord(searchedWord){
    var wordElem = document.createElement("button");
    wordElem.classList.add("word");
    wordElem.innerText = searchedWord.toLowerCase();
    wordElem.onclick = function () {deleteWord(this)};
    return wordElem;
}

function deleteWord(self){
    var wordStr = self.innerText;

    //deletes self
    self.parentNode.removeChild(self);

    //adds back letters
    wordStr.split('').forEach((letter) => {
        if (letterBank.has(letter)) {
            letterBank.set(letter, letterBank.get(letter) + 1);
        } else {
            letterBank.set(letter, 1);
        }
    })

    //updates displayed letterbank
    letterBankElem.innerText = mapToString();
}

function resetPage(){
    letterBank = new Map();
    selectedWordsElem.innerHTML = "";
}

function cleanText(input){
    input = input.toLowerCase();
    input = input.replace(/[^a-zA-Z]*/g, "");//only keeps letters
    console.log("Cleaned input to: " + input);
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

    console.log("Got letters: " + letterBank);
}

function mapToString() {
    var letterStr = "";
    letterBank.forEach((value, key, map) => { // the key and values are swapped also there is an undefined char
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
    var notEnoughLetters = false;
    wordBank.forEach((value,key) => {
        //if there are less of a letter than in the word to remove return false
        if (!letterBank.get(key) || letterBank.get(key) < value) {
            notEnoughLetters = true;
            return false;
        }
    });
    if (notEnoughLetters) { return false; }

    //remove letters from word out of letter bank
    wordBank.forEach((value,key) => {
        letterBank.set(key, letterBank.get(key) - value);
    });
    
    return true;
}