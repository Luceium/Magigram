import React from 'react'
import Word from './word';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRef } from 'react';

export default function WordGroup(props) {
    const words = props.src;
    const [draggedIndex, setDraggedIndex] = useState(-1);
    const [insertIndex, setInsertIndex] = useState(-1);
    const dispatch = useDispatch();
    const containerRef = useRef(null);

    function handleDragOver(e) {
        //TODO: handle instant send to back
        //TODO: handle constantly swapping words when on border (bc the swap causes the center to change which triggers another swap). The solution is too
        e.preventDefault();

        const children = [...containerRef.current.children]

        setInsertIndex( 
            children.reduce(
                (closest, child, index) => {
                    const box = child.getBoundingClientRect()
                    const offset = e.clientX - box.right;
                    if (offset < 0 && offset > closest.offset) {
                            return { offset: offset, insertIndex: index }
                    } else {
                        return closest
                    }
                },
                {offset: Number.NEGATIVE_INFINITY}
            ).insertIndex
        )
    }

    function handleDragEnd(e) {
        e.preventDefault();
        if (insertIndex === -1) {
            return;
        }

        // move dragged word to new position
        let wordRemoved = words.splice(draggedIndex, 1)[0]
        if (insertIndex != null) {
            words.splice(insertIndex, 0, wordRemoved)
        } else {
            words.push(wordRemoved)
        }
        
        setDraggedIndex(-1)
        setInsertIndex(-1)
        dispatch({type: 'REORDER_WORDS', payload: words})
    }

    function handleDragLeave(e) {
        e.preventDefault();
        setInsertIndex(-1)
    }

    return (
        <div onDragOver={(e) => handleDragOver(e)} onDragEnd={(e) => handleDragEnd(e)} onDragLeave={(e) => handleDragLeave(e)} ref={containerRef} >
            {words.map((word, index) => {
                return (
                    <Word
                        key={index}
                        word={word}
                        type={props.type}
                        index={index} 
                        clearInput={props.clearInput}
                        isBeingDragged={index===draggedIndex}
                        isInsertPoint={index===insertIndex}
                        setDraggedIndex={setDraggedIndex}
                        
                    />
                )
            })}
        </div>
    )
}