import { cleanFrequency, getLetterFrequencySize, removeLetter } from "./frequencyUtils";

function getModel() {
    // TODO: get All models and user weights from store to generate model
    const model = require(`../nameModel/models/masterModel.json`);
    console.log(model, model['a']);
    return model;
}

// removes letters which cannot be used in the name from the letter frequency
function validateModel(model, letterFrequency) {
    console.log(model);
    // remove letters from model that are not in the letter frequency
    let validModel = {}
    console.log(validModel);
    for (const letter in letterFrequency) {
        if (letterFrequency[letter] > 0) {
            validModel[letter] = model[letter];
            console.log(validModel);
        }
    }
    console.log(validModel);
    
    return validModel;
}

export function generateTransformerPoweredNames(letterFrequency) {
    const lettersForName = cleanFrequency({ ...letterFrequency });
    const model = validateModel(getModel(), lettersForName)
    console.log(model, model['a']);
    let names = [];
    for (let i = 0; i < 20; i++) {
        names.push(generateName(model, lettersForName));
    }
    return names;
}

function generateName(model, lettersForName) {
    lettersForName = { ...lettersForName };
    let letter;
    // Selects random first letter from lettersForName
    const keys = Object.keys(lettersForName);
    let name = keys[Math.floor(Math.random()*keys.length)];
    lettersForName = removeLetter(lettersForName, name); // name at this point is 1 character long
    
    for (let i = 0; i < getLetterFrequencySize(lettersForName); i++) {
        console.log(name, model, model[name[i]])
        letter, lettersForName = selectNextLetter(0.5, lettersForName, model[name[i]]);
        console.log(lettersForName);
        name += letter;
    }
    return name;
}

function selectNextLetter(temperature, lettersForName, nextLetterProbability) {
    let chosenLetter;

    // create percentages for each letter adding up to 1
    console.log(nextLetterProbability);
    let sum = 0;
    for (const letter in nextLetterProbability) {
        sum += nextLetterProbability[letter];
    }
    for (const letter in nextLetterProbability) {
        nextLetterProbability[letter] = nextLetterProbability[letter] / sum;
    }
    console.log(nextLetterProbability);
    
    // sort valid letters by probability
    let validLetters = [];
    for (const letter in lettersForName) {
        validLetters.push([letter, nextLetterProbability[letter]]);
    }
    validLetters.sort((a, b) => nextLetterProbability[a] - nextLetterProbability[b]);

    // select a random number between 0 and 1 * temperature
    // works by selecting a random number and checking if it is in the range of the probability of the letter
    // the temperature is used to limit the range of the probability to the top x% of the probability
    let random = 1 - Math.random() * temperature;
    // console.log(random,validLetters, nextLetterProbability);
    sum = 1;
    for (const letter in validLetters) {
        sum -= nextLetterProbability[letter];
        if (random > sum) {
            chosenLetter = letter;
            break;
        }
    }

    // remove letter from letters left for name
    // console.log(chosenLetter);
    lettersForName = removeLetter(lettersForName, chosenLetter);
    // console.log(lettersForName);
    // return letter and new lettersForName
    return [chosenLetter, lettersForName];
}