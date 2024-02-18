import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { mapLetterFrequency, isSubset, removeLetters, cleanText} from '../util/frequencyUtils';
import WordGroup from './wordGroup';
import {generateTransformerPoweredNames} from '../util/nameGen';
import { getWordChoices } from '../util/getWordChoices';

export default function WordFinder(props) {
    const dispatch = useDispatch();
    let words = useSelector(state => state.words);
    let letterFrequency = useSelector(state => state.letterFrequency);
    const [word, setWord] = useState('');
    const [wordChoices, setWordChoices] = useState([]);
    useEffect(() => {
        setWordChoices(getWordChoices(props.filter, props.type, letterFrequency, word));
    }, [letterFrequency, word, props.type, props.filter]);

    let clearInput = () => {setWord('');};

    function selectWord() {
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
    
    return (
        <>
            <div className='flex mt-1'>
                <div className="join text-base-content w-full">
                    <input className="join-item input input-md w-full" type='text' value={word} onChange={(e) => setWord(e.target.value)} onKeyDown={(e) => {if (e.key === "Enter" ) {selectWord()}}}/>
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
                    <button className="join-item btn btn-md"  onClick={selectWord}>Use word</button>
                    {props.nameBuilder ? <button className='join-item btn btn-md' onClick={async () => setWordChoices(await generateTransformerPoweredNames(letterFrequency))}>Generate Names</button> : ''}
                    
                </div>
            
            </div>
            <WordGroup src={wordChoices} type='wordList' clearInput={clearInput}/>
        </>
    )
}
