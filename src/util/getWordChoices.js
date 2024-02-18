import { cleanText, isSubset, mapLetterFrequency } from "./frequencyUtils";

export function getWordChoices(filter, type, letterFrequency, inputWord) {
    // short circuit if the input word is not a subset of the letter frequency
    let wordCopy = cleanText(inputWord);
    const inputLetterFrequency = mapLetterFrequency(wordCopy);
    if (!isSubset(inputLetterFrequency, letterFrequency)) return [];

    let wordChoices = [];
    //load JSON file for the part of speech from dictionary/JSON into trie variable
    let trie = require(`../../dictionary/JSON/${type}.json`);
    //create copy of word that has been sanitized

    //for each prefix in trie, check if the prefix can be made from the letter bank
    for (const prefix in trie) {
        let passFilter = filter==="Starts With" ? (prefix.startsWith(wordCopy) || wordCopy.startsWith(prefix)) : true;
        if (passFilter && isSubset(mapLetterFrequency(prefix), letterFrequency)) {
            for (const wordObj in trie[prefix]) {
                if (filter==="Starts With" && !wordObj.startsWith(wordCopy)) continue;
                let wordsLetterFrequency = trie[prefix][wordObj]; 
                // get frequency of input (word)
                if (filter==="Contains") {
                    if (!isSubset(inputLetterFrequency, wordsLetterFrequency)) continue;
                }
                if (!isSubset(wordsLetterFrequency, letterFrequency)) continue;
                wordChoices.push(wordObj);
            }
        }
    }

    return wordChoices;
}