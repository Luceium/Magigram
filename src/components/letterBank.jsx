import React from 'react';
import { useSelector } from 'react-redux';

function LetterBank(props) {
    // subscribe to the store
    const letterFrequency = useSelector(state => state.letterFrequency)
    console.log(letterFrequency)

    return (
        <div className='bg-info rounded d-flex'>
            <h2>Letter Bank:</h2>
            <h2>{frequencyToString(letterFrequency)}</h2>
        </div>
    )
}

// function that takes an object as an argument and returns a string with the frequency of each letter in the object
function frequencyToString(letterFrequency) {
    let string = ''
    for (let letter in letterFrequency) {
        for (let i = 0; i < letterFrequency[letter]; i++) {
            string += letter
        }
    }
    console.log(string)
    return string
}

export default LetterBank;