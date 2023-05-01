import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

export default function Word(props) {
    const dispatch = useDispatch();
    let words = useSelector(state => state.words)
    let letterFrequency = useSelector(state => state.letterFrequency)

    
    function handleOnClick(word) {
        const index = words.indexOf(word)
        words.splice(index, 1)
        let data = {letterFrequency, words}
        //updates store to remove word from word list
        dispatch({type: 'UPDATE_DATA', payload: data})
    }

    return (
        <div className='bg-success rounded p-1' onClick={(e) => handleOnClick(e.target.innerText)}>{props.word}</div>
    )
}
