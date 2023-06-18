import React from 'react';
import header from "./components/header";
import History from "./components/history";
import WordFinder from "./components/wordFinder";
import WordGroup from "./components/wordGroup";
import Foot from "./components/foot";
import LetterBank from './components/letterBank';
import Name from './components/name';
import Instructions from './components/Instructions';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Nav, Row, Tab, Tabs } from 'react-bootstrap';
// import { Nav.Link, NavItem}
import { useSelector } from 'react-redux';

function App() {
  return (
    <>
      <header />
      <Container fluid className='m-auto'>
        <Row >
          <Col md className='mt-4 bg-info rounded'>
            <Name />
          </Col>
          <Col md className='mt-4 bg-info rounded'>
            <LetterBank />
          </Col>
        </Row>
        <Row className=''>
          <Col className='col-3 bg-info rounded mt-4 mx-auto'>
            <History />
          </Col>
          <Col className='mx-auto'>
            <Row className='bg-info rounded mt-4' >
              <Tabs
                variant="tabs"
                defaultActiveKey="anagramBuilder"
                title="Anagram builder"
              >
                <Tab eventKey='anagramBuilder' title="Anagram Builder">
                  <WordFinder
                    types={['noun', 'verb', 'adjective']}
                    name='Word Finder'
                    word
                  />
                </Tab>
                <Tab eventKey='nameBuilder' title="Name Builder">
                  <WordFinder
                    types={['prefix', 'root', 'suffix']}
                    name='Part Finder'
                  />
                </Tab>
              </Tabs>
            </Row>
            <Row className='bg-info rounded' >
              <h2>
                Word Bank
              </h2>
              <WordGroup type='wordBank' src={useSelector(state => state.words)}/>
            </Row>
          </Col>
          <Col className='col-3 bg-info rounded mt-4 mx-auto'>
            <Instructions />
          </Col>
        </Row>
        {/* <Row className='bg-info rounded mt-4' >
          <Foot />
        </Row> */}
      </Container >
    </>
  );
}

export default App;
