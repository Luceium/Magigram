import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { mapLetterFrequency, isSubset, removeLetters, cleanText, frequencyToString, getLetterFrequencySize } from '../util/frequencyUtils';
import WordGroup from './wordGroup';
import {generateTransformerPoweredNames} from '../util/nameGen';

export default function WordFinder(props) {
    const dispatch = useDispatch();
    let words = useSelector(state => state.words);
    let letterFrequency = useSelector(state => state.letterFrequency);
    const [word, setWord] = useState('');
    const [wordChoices, setWordChoices] = useState([]);
    const [lettersSize, setLettersSize] = useState(getLetterFrequencySize(letterFrequency));
    useEffect(() => {
        getWordChoices();
    }, [letterFrequency, word, props.type, props.filter])
    useEffect(() => {
        setLettersSize(getLetterFrequencySize(letterFrequency));
    }, [letterFrequency])

    let clearInput = () => {setWord('');};

    function useWord() {
        if (!removeLetters(letterFrequency, word)) {
            return;
        }
        const wordsToAdd = word.split(' ').map(word => cleanText(word)).filter(word => word.length > 0);
        words = [...words, ...wordsToAdd];
        letterFrequency = {...letterFrequency};
        let data = {letterFrequency, words}
        //update the state of the store with the new word in the words list
        dispatch({type: 'UPDATE_DATA', payload: data})
        setWord(''); // clears input field
    }

    function getWordChoices() {
        let wordChoices = [];
        //load JSON file for the part of speech from dictionary/JSON into trie variable
        let trie = require(`../../dictionary/JSON/${props.type}.json`);
        //create copy of word that has been sanitized
        let wordCopy = cleanText(word);
    
        //for each prefix in trie, check if the prefix can be made from the letter bank
        for (const prefix in trie) {
            let passFilter = props.filter==="Starts With" ? prefix.startsWith(wordCopy) || wordCopy.startsWith(prefix) : true;
            if (passFilter && isSubset(mapLetterFrequency(prefix), letterFrequency)) {
                for (const wordObj in trie[prefix]) {
                    if (props.filter==="Starts With" && !wordObj.startsWith(wordCopy)) continue;
                    let wordsLetterFrequency = trie[prefix][wordObj]; 
                    // get frequency of input (word)
                    if (props.filter==="Contains") {
                        let inputLetterFrequency = mapLetterFrequency(wordCopy);
                        if (!isSubset(inputLetterFrequency, wordsLetterFrequency)) continue;
                    }
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
            <div className='flex mt-1'>
                <div className="join text-base-content w-full">
                    <input className="join-item input input-md w-full" type='text' value={word} onChange={(e) => setWord(e.target.value)} onKeyDown={(e) => {if (e.key == "Enter" ) {useWord()}}}/>
                    <select onChange={(e) => props.setType(e.target.value)} defaultValue="Filter" className="select select-bordered join-item select-md">
                        <option disabled>Filter</option>
                        <option>{props.types[0]}</option>
                        <option>{props.types[1]}</option>
                        <option>{props.types[2]}</option>
                    </select>
                    <select onChange={(e) => props.setSearch(e.target.value)} defaultValue="Search" className="select select-bordered join-item select-md ">
                        <option disabled>Search</option>
                        <option>Starts With</option>
                        <option>Contains</option>
                    </select>
                    <button className="join-item btn btn-md"  onClick={useWord}>Use word</button>
                    {props.nameBuilder ? <button className='join-item btn btn-md' onClick={async () => setWordChoices(await generateTransformerPoweredNames(letterFrequency))}>Generate Names</button> : ''}
                    
                </div>
            
            </div>
            <WordGroup src={wordChoices} type='wordList' clearInput={clearInput}/>
        </>
    )
}
