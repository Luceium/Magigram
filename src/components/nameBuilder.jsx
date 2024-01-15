import React from 'react'
import WordGroup from './wordGroup'
import WordFinder from './wordFinder'
import { useSelector } from 'react-redux';

const NameBuilder = () => {
  return (
    <div class="flex flex-1 text-neutral-content">
        <div className='mx-auto'>
        <div className=' bg-neutral rounded mt-3' >
            <div id="tabs"
                variant="tabs"
                defaultActiveKey="anagramBuilder"
                title="Anagram builder"
            >
            <div id="tab" eventKey='anagramBuilder' title="Anagram Builder">
                <WordFinder
                    types={['noun', 'verb', 'adjective']}
                    name='Word Finder'
                    word
                />
            </div>
            <div id="tab" eventKey='nameBuilder' title="Name Builder">
                <WordFinder
                    types={['prefix', 'root', 'suffix']}
                    name='Part Finder'
                />
            </div>
            </div>
        </div>
        <div className=' bg-neutral rounded' >
            <h2>
                Word Bank
            </h2>
            <WordGroup type='wordBank' src={useSelector(state => state.words)}/>
        </div>
        </div>
    </div>
  )
}

export default NameBuilder