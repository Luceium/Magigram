import React from 'react'
import { useSelector, useDispatch } from 'react-redux';

export default function WordFinder() {
    const dispatch = useDispatch();
    let words = useSelector(state => state.words);
    let letterFrequency = useSelector(state => state.letterFrequency);
    
    function handleBlur(element) {
        var word = element.value;
        if (!removeLetters(letterFrequency, word)) {
            console.log('word could not be extracted from letter bank');
            return;
        }
        words = [...words, word];
        letterFrequency = {...letterFrequency};
        console.log(words)
        let data = {letterFrequency, words}
        //update the state of the store with the new word in the words list
        dispatch({type: 'UPDATE_DATA', payload: data})
        element.value = "";
    }

    return (
        <>
            <h1>word finder</h1>
            <div>
                <input type='text' onBlur={(e) => handleBlur(e.target)}/>
                {/* <button onClick={handleClick()}>Use word</button> */}
            </div>
        </>
    )
}

function removeLetters(letterFrequency, inputWord) {
    if (!inputWord) {return false;}
    inputWord = cleanText(inputWord);

    //build map of letters in input Word
    let wordLetters = inputWord.split("");
    let wordLetterBank = {};
    wordLetters.forEach(element => {
        if (wordLetterBank[element]){
            wordLetterBank[element]++;
        } else {
            wordLetterBank[element] = 1;
        }
    });

    //checks if word is able to be taken out of letter bank
    for (const letter in wordLetterBank) {
        //if there are less of a letter than in the word to remove return false
        if (!letterFrequency[letter] || letterFrequency[letter] < wordLetterBank[letter]) {
            return false;
        }
    }

    //remove letters from word out of letter bank
    for (const letter in wordLetterBank) {
        letterFrequency[letter] = letterFrequency[letter] - wordLetterBank[letter];
    }

    return true;
}

function cleanText(input){
    input = input.toLowerCase();
    input = input.replace(/[^a-zA-Z]*/g, "");//only keeps letters
    return input;
}