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
    // create percentages for each letter adding up to 1
    for (const letter in nextLetterProbability) {
        
    }


    // sort valid letters by probability

    // select a random number between 0 and 1 * temperature

    // remove letter from letters left for name

    // return letter
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