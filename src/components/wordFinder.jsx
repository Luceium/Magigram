import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Input, Button, ButtonGroup } from 'reactstrap';
import { mapLetterFrequency, isSubset, removeLetters } from '../util/util';
import WordGroup from './wordGroup';

export default function WordFinder() {
    const dispatch = useDispatch();
    let words = useSelector(state => state.words);
    let letterFrequency = useSelector(state => state.letterFrequency);
    const [word, setWord] = useState('');
    const [pos, setPos] = useState('noun'); // part of speech [noun, verb, adjective]
    const [filter, setFilter] = useState('Starts With'); // filter word choices by prefix [word, prefix
    const [wordChoices, setWordChoices] = useState([]);
    useEffect(() => {
        getWordChoices();
    }, [letterFrequency, word, pos])
    
    function handleChange(word) {
        setWord(word);
    }

    function handleClick() {
        if (!removeLetters(letterFrequency, word)) {
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

    function handleToggleFilter(filter) {
        setFilter(filter);
    }

    // TODO: use 'word' (value in input field) to further filter word choices
    // ie. word.startsWith(word) or word.includes(word)
    // TODO: populate word choices in real time so user can see progress
    function getWordChoices() {
        let wordChoices = [];
        //load JSON file for the part of speech from tinyDictionary/JSON into trie variable
        let trie = require(`../../tinyDictionary/JSON/${pos}.json`);
    
        //for each prefix in trie, check if the prefix can be made from the letter bank
        for (const prefix in trie) {
            let passFilter = filter==="Starts With" ? prefix.startsWith(word) || word.startsWith(prefix) : true;
            console.log(prefix, passFilter);
            if (passFilter && isSubset(mapLetterFrequency(prefix), letterFrequency)) {
                for (const wordObj in trie[prefix]) {
                    let passFilter = filter==="Starts With" ? wordObj.startsWith(word) : wordObj.includes(word);
                    if (!passFilter){continue;}
                    let wordsLetterFrequency = trie[prefix][wordObj];
                    if (isSubset(wordsLetterFrequency, letterFrequency)){
                        wordChoices.push(wordObj);
                    }
                }
            }
        }
        setWordChoices(wordChoices);
    }

    return (
        <>
            <h1>word finder</h1>
            <div>
                <Input type='text' value={word} onChange={(e) => handleChange(e.target.value)}/>
                <ButtonGroup>
                    <Button
                        onClick={(e) => handleToggleFilter(e.target.innerText)}
                        active={filter==="Starts With"}
                    >
                        Starts With
                    </Button>
                    <Button
                        onClick={(e) => handleToggleFilter(e.target.innerText)}
                        active={filter==="Contains"}
                    >
                        Contains
                    </Button>
                </ButtonGroup>
                <Button onClick={handleClick}>Use word</Button>
                <ButtonGroup>
                    <Button
                        onClick={(e) => handleToggle(e.target.innerText)}
                        active={pos==="noun"}
                    >
                        Noun
                    </Button>
                    <Button
                        onClick={(e) => handleToggle(e.target.innerText)}
                        active={pos==="verb"}
                    >
                        Verb
                    </Button>
                    <Button
                        onClick={(e) => handleToggle(e.target.innerText)}
                        active={pos==="adjective"}
                    >
                        Adjective
                    </Button>
                </ButtonGroup>
            </div>
            <WordGroup src={wordChoices} type='wordList' />
        </>
    )
}
