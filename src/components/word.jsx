import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeLetters } from '../util/frequencyUtils'

export default function Word(props) {
    const dispatch = useDispatch();
    let words = useSelector(state => state.words)
    let letterFrequency = useSelector(state => state.letterFrequency)
    let isBeingDragged = false

    
    function handleOnClick(word, index) {
        if (props.type==='wordBank') {
            removeWordFromWordList(index)
        }
        if (props.type==='wordList') {
            addWordToWordList(word)
            props.clearInput();
        }
    }

    function removeWordFromWordList(index) {
        //removes the first occurrence of a specified word from a list of words and returns it as a new array
        let word = words.splice(index, 1)[0].toLowerCase()
        words = [...words]
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

    function handleDragStart(e) {
        isBeingDragged = true;
    }

    function handleDragEnd(e) {
        isBeingDragged = false;
    }

    return (
        <div className={'badge badge-pill bg-primary m-1' + (isBeingDragged ? 'opacity-50' : '')}
                style={{fontSize: '15px'}}
                onClick={(e) => handleOnClick(e.target.innerText, props.index)}
                draggable={props.type==="wordBank"}
                onDragStart={(e) => handleDragStart(e)}
                onDragEnd={(e) => handleDragEnd(e)}
        >
            {props.word}
        </div>
    )
}
