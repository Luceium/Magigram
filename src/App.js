import React, { Component } from 'react';
import './App.css';
import Nav from "./components/nav";
import Inputs from "./components/inputs";
import LetterBank from "./components/letterBank";
import History from "./components/history";
import WordFinder from "./components/wordFinder";
import CurrentWords from "./components/currentWords";
import Foot from "./components/foot";

function App() {
  return (
    <React.Fragment>
      <Nav />
      <Inputs />
      <LetterBank />
      <History />
      <WordFinder />
      <CurrentWords />
      <Foot />
    </React.Fragment>
  );
}

export default App;
