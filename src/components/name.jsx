import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input } from 'reactstrap';
import { mapLetterFrequency } from '../util/util';


function Name(props) {  
    const dispatch = useDispatch();
    let letterFrequency = useSelector(state => state.letterFrequency);
    const [currentName, updateCurrentName] = useState('');
    
    //function that handles on blur event
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
        <div className='d-flex rounded bg-info p-2'>
            <h2>Name:&nbsp;</h2>
            <Input type='text' placeholder='Tom Marvollo Riddle' className='rounded' autoComplete='name' onChange={(e) => handleChange(e.target.value)}></Input>
            <Button onClick={handleClick}>Submit</Button>
        </div>
    );
}

export default Name;