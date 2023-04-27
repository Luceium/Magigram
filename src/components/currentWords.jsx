import React from 'react'
import { useSelector } from 'react-redux';
import Word from './word';

export default function currentWords() {
    const words = useSelector(state => state.words);

    return (
        <>
            {words.map((word, i=0) => {
                return (
                    <Word key={i++} word={word}/>
                )
            })}
        </>
    )
}