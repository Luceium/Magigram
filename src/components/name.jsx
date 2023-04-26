import React from 'react';
import { useDispatch } from 'react-redux';


function Name(props) {  
    const dispatch = useDispatch();
    
    //function that handles on blur event
    function handleBlur(text) {
        let letterFrequency = mapLetterFrequency(text)
        // update the state of the store with the new letterFrequency object
        dispatch({ type: 'UPDATE_DATA', payload: { letterFrequency } })
    }
    
    return (
        <div className='d-flex rounded bg-info'>
            <h2>Name:</h2>
            <input type='text' placeholder='Tom Marvollo Riddle' onBlur={(e) => handleBlur(e.target.value)}></input>
        </div>
    );
}


// function that takes a string as an argument and returns an object with the frequency of each letter in the string
function mapLetterFrequency(string) {
    // make a variable called letterFrequency that is an empty object
    let letterFrequency = {}
    string = string.toLowerCase().split('').sort()
    string.forEach(letter => {
        // if the letter is a valid letter add it to the letterFrequency object
        if (letter.match(/[a-z]/i)) {
            // if the letter is already in the letterFrequency object, increment the count
            if (letterFrequency[letter]) {
                letterFrequency[letter]++
            } else {
                // if the letter is not in the letterFrequency object, set the count to 1
                letterFrequency[letter] = 1
            }
        }
    })
    return letterFrequency
}


export default Name;