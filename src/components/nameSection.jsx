import React from 'react'
import Inputs from './inputs'
import LetterBank from './letterBank'
import { Container, Row, Col } from 'react-bootstrap'

function NameSection (){
    return (
        <Container>
            <Row>
                <Col>
                    <Inputs />
                </Col>
                <Col>
                    <LetterBank />
                </Col>
            </Row>
        </Container>
    )   
}

export default NameSection;