import React from 'react'
import Word from './word';

export default function wordGroup(props) {
    const words = props.src;

    return (
        <div>
            {words.map((word, index) => {
                return (
                    <Word key={index} word={word} type={props.type} index={index} clearInput={props.clearInput}/>
                )
            })}
        </div>
    )
}