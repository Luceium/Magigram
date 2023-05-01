import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Input, Button, ButtonGroup } from 'reactstrap';
import { cleanText, mapLetterFrequency, isSubset } from '../util/util';

export default function WordFinder() {
    const dispatch = useDispatch();
    let words = useSelector(state => state.words);
    let letterFrequency = useSelector(state => state.letterFrequency);
    const [word, setWord] = React.useState('');
    const [pos, setPos] = React.useState('noun'); // part of speech [noun, verb, adjective]
    
    function handleChange(word) {
        setWord(word);
    }

    function handleClick() {
        if (!removeLetters(letterFrequency, word)) {
            console.log('word could not be extracted from letter bank');
            return;
        }
        words = [...words, word];
        letterFrequency = {...letterFrequency};
        let data = {letterFrequency, words}
        //update the state of the store with the new word in the words list
        dispatch({type: 'UPDATE_DATA', payload: data})
        setWord(''); // clears input field
    }

    function handleToggle(pos) {
        setPos(pos.toLowerCase());
    }

    // TODO: use 'word' (value in input field) to further filter word choices
    // ie. word.startsWith(word) or word.includes(word)
    // TODO: populate word choices in real time so user can see progress
    // function getWordChoices() {
    //     let wordChoices = [];
    //     //make api call to link and store json response in response
    //     const response = fetch(`https://github.com/Luceium/EpicAnagram/blob/main/tinyDictionary/JSON/${pos}.json`).then(response => response.json());
    
    //     //for each key in response, check if the key can be made from the letter bank
    //     for (const key in response) {
    //     }
    // }

    return (
        <>
            <h1>word finder</h1>
            <div>
                <Input type='text' value={word} onChange={(e) => handleChange(e.target.value)}/>
                <Button onClick={handleClick}>Use word</Button>
                <ButtonGroup>
                    <Button
                        onClick={(e) => handleToggle(e.target.innerText)}
                        active={pos=="noun"}
                    >
                        Noun
                    </Button>
                    <Button
                        onClick={(e) => handleToggle(e.target.innerText)}
                        active={pos=="verb"}
                    >
                        Verb
                    </Button>
                    <Button
                        onClick={(e) => handleToggle(e.target.innerText)}
                        active={pos=="adjective"}
                    >
                        Adjective
                    </Button>
                </ButtonGroup>
            </div>
            <div>
                {/* {getWordChoices()} */}
            </div>
        </>
    )
}

function removeLetters(letterFrequency, inputWord) {
    if (!inputWord) {return false;}
    inputWord = cleanText(inputWord);

    let wordLetterBank = mapLetterFrequency(inputWord);

    if (!isSubset(wordLetterBank, letterFrequency)) {return false;}

    //remove letters from word out of letter bank
    for (const letter in wordLetterBank) {
        letterFrequency[letter] = letterFrequency[letter] - wordLetterBank[letter];
    }

    return true;
}