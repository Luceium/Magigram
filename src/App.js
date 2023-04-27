import React from 'react';
import Nav from "./components/nav";
import History from "./components/history";
import WordFinder from "./components/wordFinder";
import CurrentWords from "./components/currentWords";
import Foot from "./components/foot";
import LetterBank from './components/letterBank';
import Name from './components/name';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from 'react-bootstrap';

function App() {
  return (
    <>
      <Nav />
      <Container fluid className='m-auto'>
        <Container>
          <Row>
            <Col md>
              <Name className='bg-info rounded mt-4' />
            </Col>
            <Col md>
              <LetterBank className='bg-info rounded mt-4' />
            </Col>
          </Row>
        </Container>
        <History />
        <WordFinder />
        <CurrentWords />
      </Container >
      <Foot />
    </>
  );
}

export default App;
