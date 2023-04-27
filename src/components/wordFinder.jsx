import React from 'react'
import { useSelector, useDispatch } from 'react-redux';

export default function WordFinder() {
    const dispatch = useDispatch();
    let words = useSelector(state => state.words);
    const letterFrequency = useSelector(state => state.letterFrequency);
    
    function handleBlur(word) {
        words = [...words, word];
        let data = {letterFrequency, words}
        //update the state of the store with the new word in the words list
        dispatch({type: 'UPDATE_DATA', payload: data})
    }

    return (
        <>
            <h1>word finder</h1>
            <div>
                <input type='text' onBlur={(e) => handleBlur(e.target.value)}/>
                {/* <button onClick={handleClick()}>Use word</button> */}
            </div>
        </>
    )
}