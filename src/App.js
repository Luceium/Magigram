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
        <Row >
          <Col md className='mt-4 bg-info rounded'>
            <Name />
          </Col>
          <Col md className='mt-4 bg-info rounded'>
            <LetterBank />
          </Col>
        </Row>
        <Row className='ps-5 pe-5'>
          <Col className='col-3 bg-info rounded mt-4'>
            <History />
          </Col>
          <Col className='offset-sm-1'>
            <Row className='bg-info rounded mt-4' >
              <WordFinder />
            </Row>
            <Row className='bg-info rounded mt-4' >
              <CurrentWords />
            </Row>
          </Col>
        </Row>
        <Row className='bg-info rounded mt-4' >
          <Foot />
        </Row>
      </Container >
    </>
  );
}

export default App;
