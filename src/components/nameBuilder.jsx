import React, { useState } from 'react'
import WordGroup from './wordGroup'
import WordFinder from './wordFinder'
import { useSelector } from 'react-redux';

const NameBuilder = () => {
    const [isAnagramBuilder, switchBuilder] = useState(true)

    // to persist the filter and part of speech / component of name we store them in state above which never unmounts
    const [posType, setPos] = useState("noun"); // part of speech [noun, verb, adjective]
    const [componentType, setComponentType] = useState("root"); // part of speech [noun, verb, adjective]
    const [filter, setSearch] = useState('Starts With'); // filter word choices by prefix [word, prefix]

  return (
    <div className="mt-3 p-2 flex-1 bg-neutral text-neutral-content rounded flex flex-col gap-2">
        <div role="tablist" className="tabs tabs-lifted tabs-lg">
            <button role="tab" className={`tab ${isAnagramBuilder ? "tab-active" : "text-neutral-content"}`} onClick={() => switchBuilder(true)}>Word Finder</button>
            <button role="tab" className={`tab ${!isAnagramBuilder ? "tab-active" : "text-neutral-content"}`} onClick={() => switchBuilder(false)}>Name Builder</button>
        </div>
        {isAnagramBuilder ?
        <WordFinder key="wordList" types={['noun', 'verb', 'adjective']} type={posType} setType={(type) => setPos(type)} filter={filter} setSearch={(filter) => setSearch(filter)} name/> :
        <WordFinder key="nameBuilder" types={['prefix', 'root', 'suffix']} type={componentType} setType={(type) => setComponentType(type)} filter={filter} setSearch={(filter) => setSearch(filter)}/>}
        <div className=' bg-neutral rounded' >
            <h2> Word Bank </h2>
            <WordGroup type='wordBank' src={useSelector(state => state.words)}/>
        </div>
    </div>

  )
}

export default NameBuilder