import React from 'react';
import Nav from "./components/nav";
import History from "./components/history";
import WordFinder from "./components/wordFinder";
import WordGroup from "./components/wordGroup";
import Foot from "./components/foot";
import LetterBank from './components/letterBank';
import Name from './components/name';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function App() {
  return (
    <>
      <Nav />
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
              <WordFinder />
            </Row>
            <Row className='bg-info rounded' >
              <h2>
                Word Bank
              </h2>
              <WordGroup type='wordBank' src={useSelector(state => state.words)}/>
            </Row>
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
