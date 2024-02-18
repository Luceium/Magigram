import { useSelector, useDispatch } from 'react-redux'
import { removeLetters } from '../util/frequencyUtils'
import './word.css'

export default function Word(props) {
    const dispatch = useDispatch();
    let words = useSelector(state => state.words)
    let letterFrequency = useSelector(state => state.letterFrequency)

    
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
            letterFrequency[word[i]] = letterFrequency[word[i]] ? letterFrequency[word[i]] + 1 : 1;
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
        <div className={'badge badge-pill bg-primary text-primary-content m-1 ' + (props.isBeingDragged && !props.isInsertPoint? 'opacity-50' : '') + (props.isInsertPoint && !props.isBeingDragged ? 'bounce-right' : '')}
                style={{fontSize: '15px'}}
                onClick={(e) => handleOnClick(e.target.innerText, props.index)}
                onDragStart={() => props.setDraggedIndex(props.index)}
                onDragEnd={() => props.setDraggedIndex(-1)}
                draggable={props.type==='wordBank'}
        >
            {props.word}
        </div>
    )
}
