import React from 'react'
import { useSelector } from 'react-redux';
import Word from './word';

export default function wordGroup(props) {
    const words = props.src || useSelector(state => state.words);

    return (
        <div>
            {words.map((word, i=0) => {
                return (
                    <Word key={i++} word={word} type={props.type}/>
                )
            })}
        </div>
    )
}