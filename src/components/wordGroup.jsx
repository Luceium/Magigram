import React from 'react'
import Word from './word';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRef } from 'react';

export default function wordGroup(props) {
    const words = props.src;
    const [draggedIndex, setDraggedIndex] = useState(-1);
    const dispatch = useDispatch();
    const containerRef = useRef(null);

    function handleDragOver(e) {
        //TODO: handle instent send to back
        //TODO: handle constantly swapping words when on border (bc the swap causes the center to change which triggers another swap). The solution is too
        e.preventDefault();
        let wordRemoved = words.splice(draggedIndex, 1)[0]

        const children = [...containerRef.current.children].slice(draggedIndex)

        const insertIndex = children.reduce(
            (closest, child, index, arr) => {
                const box = child.getBoundingClientRect()
                const offset = e.clientX - box.left - box.width
                if (offset < 0 && offset > closest.offset) {
                    return { offset: offset, insertIndex: index }
                } else {
                    return closest
                }
            },
            {offset: Number.NEGATIVE_INFINITY}
        ).insertIndex;
        console.log(insertIndex)

        if (insertIndex) {        
            console.log(words)
            words.splice(insertIndex, 0, wordRemoved)
            console.log(words)
            setDraggedIndex(insertIndex)
        } else {
            words.push(wordRemoved)
            setDraggedIndex(words.length-1)
        }
    }

    function handleDragEnd() {
        setDraggedIndex(-1)
        //TODO: add logic to update the store with the new word order
        dispatch({type: 'REORDER_WORDS', payload: words})
    }



    return (
        <div onDragOver={(e) => handleDragOver(e)} ref={containerRef} >
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