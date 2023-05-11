import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Input, Button, ButtonGroup } from 'reactstrap';
import { mapLetterFrequency, isSubset, removeLetters, cleanText } from '../util/util';
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

    function getLetterFrequencySize(letterFrequency) {
        let size = 0;
        for (const letter in letterFrequency) {
            size += letterFrequency[letter];
        }
        return size;
    }
    
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

    // TODO: populate word choices in real time so user can see progress
    function getWordChoices() {
        let wordChoices = [];
        //load JSON file for the part of speech from tinyDictionary/JSON into trie variable
        let trie = require(`../../tinyDictionary/JSON/${pos}.json`);
        //create copy of word that has been sanitized
        let wordCopy = cleanText(word);
    
        //for each prefix in trie, check if the prefix can be made from the letter bank
        for (const prefix in trie) {
            let passFilter = filter==="Starts With" ? prefix.startsWith(wordCopy) || wordCopy.startsWith(prefix) : true;
            if (passFilter && isSubset(mapLetterFrequency(prefix), letterFrequency)) {
                for (const wordObj in trie[prefix]) {
                    let passFilter = filter==="Starts With" ? wordObj.startsWith(wordCopy) : wordObj.includes(wordCopy);
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
    
    // takes the letter frequency and creates generates 20 random permutations of the letters such that the vowels are evenly distributed
    function generateNames() {
        let lettersSize = getLetterFrequencySize(letterFrequency);
        if (5 > lettersSize || lettersSize > 10) {
            alert('Please have 5 to 10 letters in your letter bank.');
            return;
        }

        let names = [];
        let vowels = ['a', 'e', 'i', 'o', 'u'];
        let vowelFrequency = 0;
        let consonantFrequency = 0;
        for (const letter in letterFrequency) {
            if (vowels.includes(letter)) {
                vowelFrequency += letterFrequency[letter];
            } else {
                consonantFrequency += letterFrequency[letter];
            }
        }
        
        // try to make better names by use of roots, prefix, sufix, common sounds
        // TODO: sort the lists in a topological ordering such that if A.letterFrequency is a subset of B.letterFrequency, then B comes before A
        // this would favor longer and rarer roots/prefixes/suffixes over shorter ones
        // also randomize the order of the roots/prefixes/suffixes so that the same ones don't always appear first
        const roots = [
            '',
            'ab',
            'abs',
            'ad',
            'ac',
            'af',
            'ag',
            'al',
            'an',
            'ap',
            'ar',
            'as',
            'at',
            'auto',
            'bi',
            'cap',
            'capt',
            'ced',
            'cess',
            'chron',
            'circum',
            'clam',
            'clamor',
            'cogn',
            'cognosc',
            'corp',
            'corpor',
            'cred',
            'credit',
            'cycl',
            'dem',
            'demos',
            'dict',
            'duc',
            'duct',
            'equi',
            'fac',
            'fact',
            'fer',
            'port',
            'fid',
            'fide',
            'fil',
            'fili',
            'flex',
            'flect',
            'fort',
            'gen',
            'gener',
            'grad',
            'gress',
            'gravit',
            'hab',
            'habit',
            'hydr',
            'in',
            'inter',
            'jud',
            'judici',
            'lat',
            'later',
            'liber',
            'loc',
            'loc',
            'luc',
            'luc',
            'man',
            'manu',
            'mar',
            'marit',
            'medi',
            'morph',
            'mut',
            'nat',
            'nat',
            'nec',
            'mort',
            'nov',
            'nov',
            'omni',
            'oper',
            'pac',
            'pac',
            'path',
            'path',
            'phil',
            'phon',
            'phys',
            'plan',
            'plan',
            'poss',
            'pot',
            'prim',
            'pro',
            'psych',
            'radi',
            'rupt',
            'sci',
            'scien',
            'sect',
            'sec',
            'sem',
            'semi',
            'sent',
            'sens',
            'serv',
            'sign',
            'sign',
            'sol',
            'sol',
            'spec',
            'spect',
            'spi',
            'spir',
            'stat',
            'statu',
            'ster',
            'ster',
            'sub',
            'super',
            'tac',
            'tacit',
            'temp',
            'temp',
            'ter',
            'terr',
            'therm',
            'thes',
            'thes',
            'trans',
            'tri',
            'vid',
            'vis',
            'viv',
            'vit',
            'volut',
        ].filter(word => isSubset(mapLetterFrequency(word), letterFrequency)).sort(()=>Math.random()-0.5);
        // const commonSounds = [
        //     'ch',
        //     'sh',
        //     'th',
        //     'ph',
        //     'wh',
        //     'wr',
        //     'ck',
        //     'gn',
        //     'kn',
        //     'ng',
        //     'qu',
        //     'sc',
        // ].filter(word => isSubset(mapLetterFrequency(word), letterFrequency));

        // generate names by trying to use roots and suffixes and prefixes
        let i = 0;
        while (names.length < 20) {
            let tmpLetterFrequency = { ...letterFrequency };
            // choose random root, prefix, and suffix and remove the letters from the letter frequency
            let root = roots[i % roots.length];
            removeLetters(tmpLetterFrequency, root);

            let prefix, suffix;
            //randomly chooses to prioritize suffix or prefix
            if (Math.random() < 0.5) {
                const suffixes = [
                    '',
                    'able',
                    'age',
                    'al',
                    'an',
                    'and',
                    'ary',
                    'ate',
                    'ation',
                    'ative',
                    'ed',
                    'ee',
                    'er',
                    'es',
                    'et',
                    'ful',
                    'ible',
                    'ion',
                    'ish',
                    'ist',
                    'ity',
                    'ize',
                    'less',
                    'ly',
                    'ment',
                    'ness',
                    'on',
                    'or',
                    'ous',
                    's',
                    'th',
                    'tion',
                    'tive',
                    'y'
                ].filter(word => isSubset(mapLetterFrequency(word), tmpLetterFrequency));
                suffix = suffixes[Math.floor(Math.random()*suffixes.length)];
                removeLetters(tmpLetterFrequency, suffix);

                const prefixes = [
                    '',
                    'a',
                    'ab',
                    'ad',
                    'an',
                    'ante',
                    'ap',
                    'ar',
                    'as',
                    'at',
                    'auto',
                    'be',
                    'by',
                    'co',
                    'com',
                    'con',
                    'de',
                    'dis',
                    'e',
                    'en',
                    'ex',
                    'extra',
                    'ge',
                    'in',
                    'inter',
                    'ir',
                    'mis',
                    'non',
                    'per',
                    'pre',
                    'pro',
                    're',
                    'semi',
                    'sub',
                    'super',
                    'un',
                    'under',
                    'up',
                    'with',
                    'y'
                  ].filter(word => isSubset(mapLetterFrequency(word), tmpLetterFrequency));
                prefix = prefixes[Math.floor(Math.random()*prefixes.length)];
                removeLetters(tmpLetterFrequency, prefix);
            } else {                
                const prefixes = [
                    '',
                    'a',
                    'ab',
                    'ad',
                    'an',
                    'ante',
                    'ap',
                    'ar',
                    'as',
                    'at',
                    'auto',
                    'be',
                    'by',
                    'co',
                    'com',
                    'con',
                    'de',
                    'dis',
                    'e',
                    'en',
                    'ex',
                    'extra',
                    'ge',
                    'in',
                    'inter',
                    'ir',
                    'mis',
                    'non',
                    'per',
                    'pre',
                    'pro',
                    're',
                    'semi',
                    'sub',
                    'super',
                    'un',
                    'under',
                    'up',
                    'with',
                    'y'
                ].filter(word => isSubset(mapLetterFrequency(word), tmpLetterFrequency));
                prefix = prefixes[Math.floor(Math.random()*prefixes.length)];
                removeLetters(tmpLetterFrequency, prefix);
                
                const suffixes = [
                    '',
                    'able',
                    'age',
                    'al',
                    'an',
                    'and',
                    'ary',
                    'ate',
                    'ation',
                    'ative',
                    'ed',
                    'ee',
                    'er',
                    'es',
                    'et',
                    'ful',
                    'ible',
                    'ion',
                    'ish',
                    'ist',
                    'ity',
                    'ize',
                    'less',
                    'ly',
                    'ment',
                    'ness',
                    'on',
                    'or',
                    'ous',
                    's',
                    'th',
                    'tion',
                    'tive',
                    'y'
                ].filter(word => isSubset(mapLetterFrequency(word), tmpLetterFrequency));
                suffix = suffixes[Math.floor(Math.random()*suffixes.length)];
                removeLetters(tmpLetterFrequency, suffix);
            }
            
            // generate name by stringing together root, prefix, and suffix and padding with the remaining letters from the letter frequency
            console.log('tmpLetterFrequency: ', tmpLetterFrequency);
            let leftPad, rightPad = makePadding(tmpLetterFrequency);
            // console.log('prefix: ' + prefix, 'leftPad: ' + leftPad, 'root: ' + root, 'rightPad: ' + rightPad, 'suffix: ' + suffix);
            let name = prefix + leftPad + root + rightPad + suffix;
            
            names.push(name)
            i++;
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
    function makePadding(letterFrequency) {
        console.log('letterFrequency: ' + letterFrequency)
        let leftPad = '';
        let rightPad = '';
        let lettersSize = getLetterFrequencySize(letterFrequency);
        while (lettersSize > 0) {
            let letter = letterFrequency[Math.floor(Math.random()*letterFrequency.length)];
            // console.log('letter: ' + letter);
            letterFrequency = removeLetters(letterFrequency, letter);
            // console.log('letterFrequency: ' + letterFrequency);
            if (Math.random() < 0.5) {
                leftPad += letter;
                // console.log('leftPad: ' + leftPad);
            } else {
                rightPad += letter;
                // console.log('rightPad: ' + rightPad);
            }
            lettersSize--;
        }
        return [leftPad, rightPad];
    }
    
    return (
        <>
            <h1>Word Finder</h1>
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
                <Button onClick={generateNames}>Generate Names</Button>
            </div>
            <WordGroup src={wordChoices} type='wordList' />
        </>
    )
}
