// takes the letter frequency and creates generates 20 random permutations of the letters such that the vowels are evenly distributed
function generateNames() {

    let names = [];
    // let vowels = ['a', 'e', 'i', 'o', 'u'];
    // let vowelFrequency = 0;
    // let consonantFrequency = 0;
    // for (const letter in letterFrequency) {
    //     if (vowels.includes(letter)) {
    //         vowelFrequency += letterFrequency[letter];
    //     } else {
    //         consonantFrequency += letterFrequency[letter];
    //     }
    // }
    
    // try to make better names by use of roots, prefix, suffix, common sounds
    // TODO: sort the lists in a topological ordering such that if A.letterFrequency is a subset of B.letterFrequency, then B comes before A
    // this would favor longer and rarer roots/prefixes/suffixes over shorter ones
    // also randomize the order of the roots/prefixes/suffixes so that the same ones don't always appear first
    // TODO: possibly refactor this to use the trie's
    const validRoots = roots.filter(word => isSubset(mapLetterFrequency(word), letterFrequency)).sort(()=>Math.random()-0.5);

    // generate names by trying to use roots and suffixes and prefixes
    for (let i = 0; i < 20; i++) {
        let tmpLetterFrequency = { ...letterFrequency };
        // choose random root, prefix, and suffix and remove the letters from the letter frequency
        let root = validRoots[i % roots.length];
        removeLetters(tmpLetterFrequency, root);

        let prefix, suffix;
        //randomly chooses to prioritize suffix or prefix
        if (Math.random() < 0.5) {
            const validSuffixes = suffixes.filter(word => isSubset(mapLetterFrequency(word), tmpLetterFrequency));
            suffix = suffixes[Math.floor(Math.random()*suffixes.length)];
            removeLetters(tmpLetterFrequency, suffix);

            const validPrefixes = prefixes.filter(word => isSubset(mapLetterFrequency(word), tmpLetterFrequency));
            prefix = validPrefixes[Math.floor(Math.random()*validPrefixes.length)];
            removeLetters(tmpLetterFrequency, prefix);
        } else {                
            const validPrefixes = prefixes.filter(word => isSubset(mapLetterFrequency(word), tmpLetterFrequency));
            prefix = validPrefixes[Math.floor(Math.random()*validPrefixes.length)];
            removeLetters(tmpLetterFrequency, prefix);
            
            const validSuffixes = suffixes.filter(word => isSubset(mapLetterFrequency(word), tmpLetterFrequency));
            suffix = validSuffixes[Math.floor(Math.random()*validSuffixes.length)];
            removeLetters(tmpLetterFrequency, suffix);
        }
        
        // generate name by stringing together root, prefix, and suffix and padding with the remaining letters from the letter frequency
        let padding = makePadding(frequencyToString(tmpLetterFrequency));
        let leftPad = padding[0];
        let rightPad = padding[1];
        let name = prefix + leftPad + root + rightPad + suffix;
        
        if (!names.includes(name)) {
            names.push(name)
        }
    }

    // generate remaining amount of names with equal distribution of vowels between consonants
    // for (let i = names.length; i < 20; i++) {
    //     let name = '';
    //     let min, max = vowelFrequency < consonantFrequency ? [vowels, consonant] : [consonant, vowels];

    //     names.push(name);
    // }
    return names;
}

// evenly splits the remaining letters in the letter frequency between the left and right padding and randomly organizes the letters in each
function makePadding(input) {
    //randomly reorder string
    let shuffled = input.split('').sort(() => 0.5 - Math.random()).join('');
    //choose random index to split string
    let splitIndex = Math.floor(Math.random() * shuffled.length);

    return [shuffled.slice(0, splitIndex), shuffled.slice(splitIndex)];
}

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

function selectNextLetter(temperature) {
    // create percentages for each letter adding up to 1
    
    // sort valid letters by probability

    // select a random number between 0 and 1 * temperature

    // remove letter from letters left for name

    // return letter
    return letter;
}

function getModel() {
    // TODO: get All models and user weights from store to generate model
    return require(`../nameModel/models/masterModel.json`)
}

export function generateTransformerPoweredNames() {
    let lettersForName = { ...letterFrequency };
    model = validateModel(getModel(), lettersForName)
    for (let i = 0; i < 20; i++) {
        names.push(generateName(model, lettersForName));
    }
}

function generateName() {

}