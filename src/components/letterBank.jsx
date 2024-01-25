import React from 'react';
import { useSelector } from 'react-redux';
import { frequencyToString } from '../util/frequencyUtils';

function LetterBank(props) {
    // subscribe to the store
    const letterFrequency = useSelector(state => state.letterFrequency);
    
    return (
        <div className='p-2 bg-neutral rounded flex flex-1 items-center text-neutral-content'>
            <h2>Letter Bank: &nbsp;</h2>
            {/* The input class is added to have the same size and styling as the Name input section */}
            <div className='rounded bg-primary input text-primary-content px-2 flex items-center justify-center'>
                <h2 className='text-2xl text-center'>{frequencyToString(letterFrequency)}</h2>
            </div>
        </div>
    )
}

export default LetterBank;