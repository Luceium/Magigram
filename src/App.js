import React from 'react';
import './App.css';
import Nav from "./components/nav";
import NameSection from "./components/nameSection";
import History from "./components/history";
import WordFinder from "./components/wordFinder";
import CurrentWords from "./components/currentWords";
import Foot from "./components/foot";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <React.Fragment>
      <Nav />
      <NameSection />
      <History />
      <WordFinder />
      <CurrentWords />
      <Foot />
    </React.Fragment>
  );
}

export default App;
