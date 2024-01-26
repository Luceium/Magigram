import React, { useState } from 'react'
import WordGroup from './wordGroup'
import WordFinder from './wordFinder'
import { useSelector } from 'react-redux';

const NameBuilder = () => {
    const [isAnagramBuilder, switchBuilder] = useState(true)

  return (
    <div class="mt-3 p-2 flex-1 bg-neutral text-neutral-content rounded">
        <div role="tablist" className="tabs tabs-lifted tabs-lg">
            <button role="tab" className={`tab ${isAnagramBuilder ? "tab-active" : ""}`} onClick={() => switchBuilder(!isAnagramBuilder)}>Word Finder</button>
            <button role="tab" className={`tab ${!isAnagramBuilder ? "tab-active" : ""}`} onClick={() => switchBuilder(!isAnagramBuilder)}>Name Builder</button>
        </div>
        <div className='mx-auto'>
            <div className=' bg-neutral rounded mt-3' >
                {isAnagramBuilder ?
                <WordFinder types={['noun', 'verb', 'adjective']} word /> :
                <WordFinder types={['prefix', 'root', 'suffix']}/>}
            </div>
        </div>
        <div className=' bg-neutral rounded' >
            <h2> Word Bank </h2>
            <WordGroup type='wordBank' src={useSelector(state => state.words)}/>
        </div>
    </div>

  )
}

export default NameBuilder