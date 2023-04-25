import React, { Component } from 'react';
class LetterBank extends Component {
    // make a react state that initializes letterFrequency to an empty object

    // make a function called letterFrequency that takes a string as an argument
    // and sets the state variable, letterFrequency to an object with the frequency of each letter in the string
    // then return all the letters from the input string in sorted order as a string
    letterFrequency = (string) => {
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
        console.log(string)
        console.log(string.concat(''))
        return string.concat('')
    }
       
    render() { 

        return (
        <div className='border-primary'>
            <h2>{this.letterFrequency("bob world")}</h2>
        </div>
        );
    }
}
 
export default LetterBank;