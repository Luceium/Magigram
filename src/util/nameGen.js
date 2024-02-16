import { cleanFrequency, getLetterFrequencySize } from "./frequencyUtils";

// removes letters which cannot be used in the name from the letter frequency
function validateModel(model, letterFrequency) {
    // remove letters from model that are not in the letter frequency
    let validModel = { ...model }
    for (const letter in model) {
        if (!letterFrequency[letter] || letterFrequency[letter] < 1) {
            delete validModel[letter];
        }
    }
    
    return validateModel
}

function selectNextLetter(temperature, lettersForName, nextLetterProbability) {
    let chosenLetter;

    // create percentages for each letter adding up to 1
    let sum = 0;
    for (const letter in nextLetterProbability) {
        sum += nextLetterProbability[letter];
    }
    for (const letter in nextLetterProbability) {
        nextLetterProbability[letter] = nextLetterProbability[letter] / sum;
    }

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
    sum = 1;
    for (const letter in validLetters) {
        sum -= nextLetterProbability[letter];
        if (random > sum) {
            chosenLetter = letter;
            break;
        }
    }

    // remove letter from letters left for name
    lettersForName = removeLetter(lettersForName, chosenLetter);
    // return letter and new lettersForName
    return [letter, lettersForName];
}

function getModel() {
    // TODO: get All models and user weights from store to generate model
    return require(`../nameModel/models/masterModel.json`)
}

export function generateTransformerPoweredNames() {
    let lettersForName = cleanFrequency({ ...letterFrequency });
    model = validateModel(getModel(), lettersForName)
    for (let i = 0; i < 20; i++) {
        names.push(generateName(model, lettersForName));
    }
}

function generateName(model, lettersForName) {
    let lettersForName = { ...lettersForName };
    let letter;
    // Selects random first letter from lettersForName
    const keys = Object.keys(lettersForName);
    let name = keys[Math.floor(Math.random()*keys.length)];
    lettersForName = removeLetter(lettersForName, name); // name at this point is 1 character long

    for (let i = 0; i < getLetterFrequencySize(lettersForName); i++) {
        letter, lettersForName = selectNextLetter(0.5, lettersForName, model[name[i]]);
        name += letter;
    }
    return name;
}