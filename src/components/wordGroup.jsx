import React from 'react'
import Word from './word';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function wordGroup(props) {
    const words = props.src;
    const [draggedIndex, setDraggedIndex] = useState(-1);
    const dispatch = useDispatch();
    // const 

    function handleDragOver(e) {
        e.preventDefault();
        let wordRemoved = words.splice(draggedIndex, 1)[0]

        //TODO: add logic to determine where to insert the dragged word
        const insertIndex = 0;
        words.splice(insertIndex, 0, wordRemoved)
        setDraggedIndex(insertIndex)
    }

    function handleDragEnd() {
        setDraggedIndex(-1)
        //TODO: add logic to update the store with the new word order
        dispatch({type: 'REORDER_WORDS', payload: words})
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