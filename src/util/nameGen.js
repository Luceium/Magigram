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
    console.log(model);
    let names = [];
    // TODO: change 1 back to 20
    for (let i = 0; i < 1; i++) {
        names.push(generateName(model, lettersForName));
    }
    return names;
}

function generateName(model, lettersForName) {
    lettersForName = { ...lettersForName };
    model = {...model}
    let letter;
    // Selects random first letter from lettersForName
    const keys = Object.keys(lettersForName);
    // TODO: change back to random first letter
    // let name = keys[Math.floor(Math.random()*keys.length)];
    let name = keys[0];
    lettersForName = removeLetter(lettersForName, name); // name at this point is 1 character long
    const frequencySize = getLetterFrequencySize(lettersForName);
    console.log(frequencySize, lettersForName);
    for (let i = 0; i < getLetterFrequencySize(lettersForName); i++) {
        // TODO: change 0 back to 0.5
        [letter, lettersForName] = selectNextLetter(0, lettersForName, model[name[i]]);
        console.log(lettersForName, frequencyToString(lettersForName));
        name += letter;
        if (!lettersForName[letter]) {
            model = removeLetterFromModel(model, letter);
            console.log(model);
        }
    }
    return name;
}

function selectNextLetter(temperature, lettersForName, nextLetterFrequency) {
    let chosenLetter;
    const nextLetterProbability = { ...nextLetterFrequency };
    console.log(nextLetterProbability);
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
    console.log(validLetters);

    // select a random number between 0 and 1 * temperature
    // works by selecting a random number and checking if it is in the range of the probability of the letter
    // the temperature is used to limit the range of the probability to the top x% of the probability
    let random = 1 - Math.random() * temperature;
    sum = 1;
    for (const i in validLetters) {
        const letter = validLetters[i];
        sum -= nextLetterProbability[letter];
        console.log(letter, nextLetterProbability[letter], sum, random, sum < random);
        if (random > sum) {
            chosenLetter = letter;
            break;
        }
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