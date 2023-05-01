import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeLetters } from '../util/util'

export default function Word(props) {
    const dispatch = useDispatch();
    let words = useSelector(state => state.words)
    let letterFrequency = useSelector(state => state.letterFrequency)

    
    function handleOnClick(word) {
        if (props.wordBank) {
            removeWordFromWordList(word)
        } else {
            addWordToWordList(word)
        }
    }

    function removeWordFromWordList(word) {
        //removes the first occurance of a specified word from a list of words and returns it as a new array
        words = words.filter(element => element !== word)
        //adds the letters from the word back into the letter bank
        for (let i = 0; i < word.length; i++) {
            letterFrequency[word[i]]++
        }
        letterFrequency = {...letterFrequency}
        let data = {letterFrequency, words}
        //updates store to remove word from word list
        dispatch({type: 'UPDATE_DATA', payload: data})
    }

    function addWordToWordList(word) {
        removeLetters(letterFrequency, word)
        words = [...words, word];
        letterFrequency = {...letterFrequency};
        let data = {letterFrequency, words}
        //update the state of the store with the new word in the words list
        dispatch({type: 'UPDATE_DATA', payload: data})
    }

    return (
        <div className='bg-success rounded p-1' onClick={(e) => handleOnClick(e.target.innerText)}>{props.word}</div>
    )
}
