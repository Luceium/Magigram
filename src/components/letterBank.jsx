import React from 'react';
import { useSelector } from 'react-redux';

function LetterBank(props) {
    // subscribe to the store
    const letterFrequency = useSelector(state => state.letterFrequency)

    return (
        <div className='bg-info rounded d-flex p-2'>
            <h2>Letter Bank: &nbsp;</h2>
            <h2>{frequencyToString(letterFrequency)}</h2>
        </div>
    )
}

// function that takes an object as an argument and returns a string with the frequency of each letter in the object
function frequencyToString(letterFrequency) {
    let letterBank = ''
    // iterate through the keys of the letterFrequency object and add the key to the letterBank string the number of times specified by the value
    for (let letter in letterFrequency) {
        letterBank += letter.repeat(letterFrequency[letter])
    }
    return letterBank
}

export default LetterBank;