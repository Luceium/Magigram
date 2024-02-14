import React, { useState } from 'react'
import WordGroup from './wordGroup'
import WordFinder from './wordFinder'
import { useSelector } from 'react-redux';

const NameBuilder = () => {
    const [isAnagramBuilder, switchBuilder] = useState(true)

  return (
    <div className="mt-3 p-2 flex-1 bg-neutral text-neutral-content rounded flex flex-col gap-2">
        <div role="tablist" className="tabs tabs-lifted tabs-lg">
            <button role="tab" className={`tab ${isAnagramBuilder ? "tab-active" : "text-neutral-content"}`} onClick={() => switchBuilder(true)}>Word Finder</button>
            <button role="tab" className={`tab ${!isAnagramBuilder ? "tab-active" : "text-neutral-content"}`} onClick={() => switchBuilder(false)}>Name Builder</button>
        </div>
        {isAnagramBuilder ?
        <WordFinder types={['noun', 'verb', 'adjective']} word /> :
        <WordFinder types={['prefix', 'root', 'suffix']}/>}
        <div className=' bg-neutral rounded' >
            <h2> Word Bank </h2>
            <WordGroup type='wordBank' src={useSelector(state => state.words)}/>
        </div>
    </div>

  )
}

export default NameBuilder