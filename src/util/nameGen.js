import { cleanFrequency, frequencyToString, getLetterFrequencySize, removeLetter } from "./frequencyUtils";

async function getModel() {
    // TODO: get All models and user weights from store to generate model
    const model = await fetch('https://luceium.github.io/Magigram/nameModel/models/masterModel.json').then(response => response.json());
    return model;
}

// removes letters which cannot be used in the name from the letter frequency
function validateModel(model, letterFrequency) {
    // remove letters from model that are not in the letter frequency
    let validModel = {}
    for (const letter in letterFrequency) {
        const validNextLetters = {};

        for (const nextLetter in letterFrequency) {
            validNextLetters[nextLetter] = model[letter][nextLetter] ?? 0;
        }

        validModel[letter] = validNextLetters;
    }
    
    return validModel;
}

export async function generateTransformerPoweredNames(letterFrequency) {
    const lettersForName = cleanFrequency({ ...letterFrequency }); // should not be needed if letterFrequency is maintained properly
    const model = validateModel(await getModel(), lettersForName)
    let names = [];
    for (let i = 0; i < 20; i++) {
        names.push(generateName(model, lettersForName));
    }
    return names;
}

function generateName(model, lettersForName) {
    lettersForName = { ...lettersForName };
    model = structuredClone(model);
    let letter;
    // Selects random first letter from lettersForName
    const keys = Object.keys(lettersForName);
    let name = keys[Math.floor(Math.random()*keys.length)];
    lettersForName = removeLetter(lettersForName, name); // name at this point is 1 character long
    const frequencySize = getLetterFrequencySize(lettersForName);
    for (let i = 0; i < frequencySize; i++) {
        [letter, lettersForName] = selectNextLetter(1, lettersForName, model[name[i]]);
        name += letter;
        if (!lettersForName[letter]) {
            model = removeLetterFromModel(model, letter);
        }
    }
    return name;
}

function selectNextLetter(temperature, lettersForName, nextLetterFrequency) {
    let chosenLetter;
    const nextLetterProbability = { ...nextLetterFrequency };
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
        validLetters.push(letter);
    }
    validLetters.sort((a, b) => nextLetterProbability[b] - nextLetterProbability[a]);

    // select a random number between 0 and 1 * temperature
    // works by selecting a random number and checking if it is in the range of the probability of the letter
    // the temperature is used to limit the range of the probability to the top x% of the probability
    let random = 1 - Math.random() * temperature;
    sum = 1;
    for (const i in validLetters) {
        const letter = validLetters[i];
        sum -= nextLetterProbability[letter];
        if (random > sum) {
            chosenLetter = letter;
            break;
        }
    }
    // if no letter is chosen, choose the last letter
    // this can happen if remaining letters are not in the model
    // this indicative of a small corpus and infant model
    if (!chosenLetter) {
        chosenLetter = validLetters[validLetters.length - 1];
    }

    // remove letter from letters left for name
    lettersForName = removeLetter(lettersForName, chosenLetter);
    // return letter and new lettersForName
    return [chosenLetter, lettersForName];
}

function removeLetterFromModel(model, letter) {
    for (const firstLetter in model) {
        delete model[firstLetter][letter];
    }
    
    return model;
}