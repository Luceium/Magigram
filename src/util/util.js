// function that takes a string as an argument and returns an object with the frequency of each letter in the string
function mapLetterFrequency(string) {
    // make a variable called letterFrequency that is an empty object
    let letterFrequency = {}
    string = string.toLowerCase().split('').sort()
    string.forEach(letter => {
        // if the letter is a valid letter add it to the letterFrequency object
        if (letter.match(/[a-z]/i)) {
            // if the letter is already in the letterFrequency object, increment the count
            if (letterFrequency[letter]) {
                letterFrequency[letter]++
            } else {
                // if the letter is not in the letterFrequency object, set the count to 1
                letterFrequency[letter] = 1
            }
        }
    })
    return letterFrequency
}

function deepEquals(obj1, obj2){
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

function cleanText(input){
    input = input.toLowerCase();
    input = input.replace(/[^a-zA-Z]*/g, "");//only keeps letters
    return input;
}