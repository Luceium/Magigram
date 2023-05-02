import React from 'react';
import { useSelector } from 'react-redux';
import { frequencyToString } from '../util/util';

function LetterBank(props) {
    // subscribe to the store
    const letterFrequency = useSelector(state => state.letterFrequency);
    // console.log(letterFrequency, "useSelector was updated")

    return (
        <div className='bg-info rounded d-flex p-2'>
            <h2>Letter Bank: &nbsp;</h2>
            <h2 className='rounded bg-secondary px-2'>{frequencyToString(letterFrequency)}</h2>
        </div>
    )
}

export default LetterBank;