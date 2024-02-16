import React, { useState } from 'react'
import WordGroup from './wordGroup'
import WordFinder from './wordFinder'
import { useSelector } from 'react-redux';

const NameBuilder = () => {
    const [nameBuilder, switchBuilder] = useState(false)

    // to persist the filter and part of speech / component of name we store them in state above which never unmounts
    const [posType, setPos] = useState("noun"); // part of speech [noun, verb, adjective]
    const [componentType, setComponentType] = useState("root"); // part of speech [noun, verb, adjective]
    const [filter, setSearch] = useState('Starts With'); // filter word choices by prefix [word, prefix]

  return (
    <div className="mt-3 p-2 flex-1 bg-neutral text-neutral-content rounded flex flex-col gap-2">
        <div role="tablist" className="tabs tabs-lifted tabs-lg">
            <button role="tab" className={`tab ${!nameBuilder ? "tab-active" : "text-neutral-content"}`} onClick={() => switchBuilder(false)}>Word Finder</button>
            <button role="tab" className={`tab ${nameBuilder ? "tab-active" : "text-neutral-content"}`} onClick={() => switchBuilder(true)}>Name Builder</button>
        </div>
        <WordFinder
          key={!nameBuilder ? "wordList" : "nameBuilder"}
          types={!nameBuilder ? ['noun', 'verb', 'adjective'] : ['prefix', 'root', 'suffix']}
          type={!nameBuilder ? posType : componentType}
          setType={!nameBuilder ? (type) => setPos(type) : (type) => setComponentType(type)}
          filter={filter} setSearch={(filter) => setSearch(filter)}
          nameBuilder={nameBuilder}
        />
        <div className="divider p-0 m-0"></div> 
        <div className=' bg-neutral rounded' >
            <h1> Word Bank </h1>
            <WordGroup type='wordBank' src={useSelector(state => state.words)}/>
        </div>
    </div>

  )
}

export default NameBuilder