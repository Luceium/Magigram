import React from 'react'
import Word from './word';
import { useState } from 'react';
import { type } from '@testing-library/user-event/dist/type';

export default function wordGroup(props) {
    const words = props.src;
    const [draggedIndex, setDraggedIndex] = useState(-1);
    // const 

    function handleDragOver(e) {
        e.preventDefault();
        let wordRemoved = words.splice(draggedIndex, 1)[0]

        //TODO: add logic to determine where to insert the dragged word

        words.splice(0, 0, wordRemoved)
    }

    function handleDragEnd() {
        setDraggedIndex(-1)
        //TODO: add logic to update the store with the new word order
    }



    return (
        <div onDragOver={(e) => handleDragOver(e)}>
            {words.map((word, index) => {
                return (
                    <Word
                        key={index}
                        word={word}
                        type={props.type}
                        index={index} 
                        clearInput={props.clearInput}
                        isBeingDragged={index===draggedIndex}
                        setDraggedIndex={setDraggedIndex}
                        
                    />
                )
            })}
        </div>
    )
}