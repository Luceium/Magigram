import React from 'react';
import Header from "./components/header";
import History from "./components/history";
import WordFinder from "./components/wordFinder";
import WordGroup from "./components/wordGroup";
import Foot from "./components/foot";
import LetterBank from './components/letterBank';
import Name from './components/name';
import Instructions from './components/Instructions';
import './CompiledApp.css';
import { useSelector } from 'react-redux';
import { themeChange } from 'theme-change'
themeChange()

function App() {
  return (
    <>
      <Header />
      <div fluid className='m-auto'>
        <div >
          <div md className='mt-4 bg-info rounded'>
            <Name />
          </div>
          <div md className='mt-4 bg-info rounded'>
            <LetterBank />
          </div>
        </div>
        <div className=''>
          <div className='col-3 bg-info rounded mt-4 mx-auto'>
            <History />
          </div>
          <div className='mx-auto'>
            <div className='bg-info rounded mt-4' >
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
            <div className='bg-info rounded' >
              <h2>
                Word Bank
              </h2>
              <WordGroup type='wordBank' src={useSelector(state => state.words)}/>
            </div>
          </div>
          <div className='col-3 bg-info rounded mt-4 mx-auto'>
            <Instructions />
          </div>
        </div>
        {/* <div className='bg-info rounded mt-4' >
          <Foot />
        </div> */}
      </div >
    </>
  );
}

export default App;
