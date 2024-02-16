import { cleanFrequency, getLetterFrequencySize, removeLetter } from "./frequencyUtils";

async function getModel() {
    // TODO: get All models and user weights from store to generate model
    const model = await fetch('https://luceium.github.io/Magigram/nameModel/models/masterModel.json').then(response => response.json());
    console.log(model);
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
        [letter, lettersForName] = selectNextLetter(0.5, lettersForName, model[name[i]]);
        console.log(lettersForName);
        name += letter;
    }
    return name;
}

function selectNextLetter(temperature, lettersForName, nextLetterProbability) {
    let chosenLetter;
    nextLetterProbability = { ...nextLetterProbability };
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
    console.log(lettersForName);
    for (const letter in lettersForName) {
        console.log(letter);
        validLetters.push(letter);
    }
    console.log(validLetters);
    validLetters.sort((a, b) => nextLetterProbability[a] - nextLetterProbability[b]);
    console.log(validLetters);

    // select a random number between 0 and 1 * temperature
    // works by selecting a random number and checking if it is in the range of the probability of the letter
    // the temperature is used to limit the range of the probability to the top x% of the probability
    let random = 1 - Math.random() * temperature;
    // console.log(random,validLetters, nextLetterProbability);
    sum = 1;
    for (const i in validLetters) {
        const letter = validLetters[i];
        console.log(letter, nextLetterProbability[letter], sum, random, sum < random);
        sum -= nextLetterProbability[letter];
        if (random > sum) {
            chosenLetter = letter;
            break;
        }
    }

    // remove letter from letters left for name
    // console.log(chosenLetter);
    console.log(chosenLetter, lettersForName);
    lettersForName = removeLetter(lettersForName, chosenLetter);
    // console.log(lettersForName);
    // return letter and new lettersForName
    console.log(chosenLetter, lettersForName);
    return [chosenLetter, lettersForName];
}