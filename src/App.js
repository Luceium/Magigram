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
import { useEffect } from 'react'
import { themeChange } from 'theme-change'
import NameBuilder from './components/nameBuilder';

function App() {
  useEffect(() => {
    themeChange(false)
    // 👆 false parameter is required for react project
  }, [])

  return (
    <>
      <Header />
        <div className='flex m-3'>
            <div className="flex flex-col mr-3">
              <Name />
              <History />
            </div>
            <div className="flex flex-col flex-1">
              <LetterBank />
              <NameBuilder />
            </div>
        </div>
      {/* <div className=' bg-neutral rounded mt-3' >
        <Foot />
      </div> */}
    </>
  );
}

export default App;
