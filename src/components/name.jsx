import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mapLetterFrequency } from '../util/frequencyUtils';


function Name(props) {
    const dispatch = useDispatch();
    let letterFrequency = useSelector(state => state.letterFrequency);
    const [currentName, updateCurrentName] = useState('');
    
    function handleChange(text) {
        updateCurrentName(text);
    }

    function handleClick() {
        letterFrequency = mapLetterFrequency(currentName);
        const words = []; //reset all words in word list
        let data = { letterFrequency, words }
        // update the state of the store with the new letterFrequency object
        dispatch({ type: 'CLEAR' })
        dispatch({ type: 'UPDATE_DATA', payload: data })
    }
    
    return (
        <div className='p-2 bg-neutral text-neutral-content rounded flex items-center'>
            <h2>Name:&nbsp;</h2>
            <div className="join">
                <input type='text' placeholder='Tom Marvollo Riddle' className='input w-full max-w-xs join-item text-base-content' autoComplete='name' onChange={(e) => handleChange(e.target.value)} onKeyDown={(e) => {if (e.key === "Enter") {handleClick()}}}/>
                <button className='btn join-item' onClick={handleClick}>Submit</button>
            </div>
        </div>
    );
}

export default Name;