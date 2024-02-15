import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { mapLetterFrequency, isSubset, removeLetters, cleanText, frequencyToString, getLetterFrequencySize } from '../util/frequencyUtils';
import WordGroup from './wordGroup';
import { prefixes, roots, suffixes } from '../util/nameComponents';

export default function WordFinder(props) {
    const dispatch = useDispatch();
    let words = useSelector(state => state.words);
    let letterFrequency = useSelector(state => state.letterFrequency);
    const [word, setWord] = useState('');
    const [wordChoices, setWordChoices] = useState([]);
    useEffect(() => {
        getWordChoices();
    }, [letterFrequency, word, props.type, props.filter])

    let clearInput = () => {setWord('');};

    function useWord() {
        if (!removeLetters(letterFrequency, word)) {
            return;
        }
        words = [...words, ...word.split(' ')];
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
    
    // takes the letter frequency and creates generates 20 random permutations of the letters such that the vowels are evenly distributed
    function generateNames() {
        let lettersSize = getLetterFrequencySize(letterFrequency);
        if (5 > lettersSize || lettersSize > 10) {
            alert('Please have 5 to 10 letters in your letter bank.');
            return;
        }

        let names = [];
        // let vowels = ['a', 'e', 'i', 'o', 'u'];
        // let vowelFrequency = 0;
        // let consonantFrequency = 0;
        // for (const letter in letterFrequency) {
        //     if (vowels.includes(letter)) {
        //         vowelFrequency += letterFrequency[letter];
        //     } else {
        //         consonantFrequency += letterFrequency[letter];
        //     }
        // }
        
        // try to make better names by use of roots, prefix, suffix, common sounds
        // TODO: sort the lists in a topological ordering such that if A.letterFrequency is a subset of B.letterFrequency, then B comes before A
        // this would favor longer and rarer roots/prefixes/suffixes over shorter ones
        // also randomize the order of the roots/prefixes/suffixes so that the same ones don't always appear first
        // TODO: possibly refactor this to use the trie's
        const validRoots = roots.filter(word => isSubset(mapLetterFrequency(word), letterFrequency)).sort(()=>Math.random()-0.5);

        // generate names by trying to use roots and suffixes and prefixes
        for (let i = 0; i < 20; i++) {
            let tmpLetterFrequency = { ...letterFrequency };
            // choose random root, prefix, and suffix and remove the letters from the letter frequency
            let root = validRoots[i % roots.length];
            removeLetters(tmpLetterFrequency, root);

            let prefix, suffix;
            //randomly chooses to prioritize suffix or prefix
            if (Math.random() < 0.5) {
                const validSuffixes = suffixes.filter(word => isSubset(mapLetterFrequency(word), tmpLetterFrequency));
                suffix = suffixes[Math.floor(Math.random()*suffixes.length)];
                removeLetters(tmpLetterFrequency, suffix);

                const validPrefixes = prefixes.filter(word => isSubset(mapLetterFrequency(word), tmpLetterFrequency));
                prefix = validPrefixes[Math.floor(Math.random()*validPrefixes.length)];
                removeLetters(tmpLetterFrequency, prefix);
            } else {                
                const validPrefixes = prefixes.filter(word => isSubset(mapLetterFrequency(word), tmpLetterFrequency));
                prefix = validPrefixes[Math.floor(Math.random()*validPrefixes.length)];
                removeLetters(tmpLetterFrequency, prefix);
                
                const validSuffixes = suffixes.filter(word => isSubset(mapLetterFrequency(word), tmpLetterFrequency));
                suffix = validSuffixes[Math.floor(Math.random()*validSuffixes.length)];
                removeLetters(tmpLetterFrequency, suffix);
            }
            
            // generate name by stringing together root, prefix, and suffix and padding with the remaining letters from the letter frequency
            let padding = makePadding(frequencyToString(tmpLetterFrequency));
            let leftPad = padding[0];
            let rightPad = padding[1];
            let name = prefix + leftPad + root + rightPad + suffix;
            
            if (!names.includes(name)) {
                names.push(name)
            }
        }

        // generate remaining amount of names with equal distribution of vowels between consonants
        // for (let i = names.length; i < 20; i++) {
        //     let name = '';
        //     let min, max = vowelFrequency < consonantFrequency ? [vowels, consonant] : [consonant, vowels];

        //     names.push(name);
        // }
        setWordChoices(names);
    }

    // evenly splits the remaining letters in the letter frequency between the left and right padding and randomly organizes the letters in each
    function makePadding(input) {
        //randomly reorder string
        let shuffled = input.split('').sort(() => 0.5 - Math.random()).join('');
        //choose random index to split string
        let splitIndex = Math.floor(Math.random() * shuffled.length);

        return [shuffled.slice(0, splitIndex), shuffled.slice(splitIndex)];
    }
    
    return (
        <>
            <div className=' mt-1'>
                <div className="join text-base-content w-full">
                    <input className="join-item input input-md w-full" type='text' value={word} onChange={(e) => setWord(e.target.value)}/>
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
                </div>
            
                {props.nameBuilder || <button onClick={generateNames}>Generate Names</button>}
            </div>
            <WordGroup src={wordChoices} type='wordList' clearInput={clearInput}/>
        </>
    )
}
