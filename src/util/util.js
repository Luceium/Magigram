export function cleanText(input){
    input = input.toLowerCase();
    input = input.replace(/[^a-z]*/g, "");//only keeps letters
    return input;
}

export function deepEquals(obj1, obj2){
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

export function isSubset(subset, superset) {
    for (const key in subset) {
        if (!(key in superset) || subset[key] > superset[key]) {
            return false;
        }
    }
    return true;
}

// export function that takes a string as an argument and returns an object with the frequency of each letter in the string
export function mapLetterFrequency(string) {
    // make a variable called letterFrequency that is an empty object
    let letterFrequency = {}
    string = cleanText(string).split('').sort()
    string.forEach(letter => {
        // if the letter is already in the letterFrequency object, increment the count
        if (letterFrequency[letter]) {
            letterFrequency[letter]++
        } else {
            // if the letter is not in the letterFrequency object, set the count to 1
            letterFrequency[letter] = 1
        }
    })
    return letterFrequency
}

export function removeLetters(letterFrequency, inputWord) {
    if (!inputWord) {return false;}
    inputWord = cleanText(inputWord);

    let wordLetterBank = mapLetterFrequency(inputWord);

    if (!isSubset(wordLetterBank, letterFrequency)) {return false;}

    //remove letters from word out of letter bank
    for (const letter in wordLetterBank) {
        letterFrequency[letter] = letterFrequency[letter] - wordLetterBank[letter];
    }

    return true;
}

// function that takes an object as an argument and returns a string with the frequency of each letter in the object
export function frequencyToString(letterFrequency) {
    let letterBank = ''
    // iterate through the keys of the letterFrequency object and add the key to the letterBank string the number of times specified by the value
    for (let letter in letterFrequency) {
        letterBank += letter.repeat(letterFrequency[letter])
    }
    return letterBank
}