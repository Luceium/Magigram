import React, { Component } from 'react';
import NavBar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'

function Nav(){
    return (
        <NavBar bg="dark" variant="dark">
            <Container>
                <NavBar.Brand href="#home">
                    <img 
                        src="/logo512.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="Epic Anagram logo"
                    />
                    Epic Anagram
                </NavBar.Brand>
            </Container>
        </NavBar>
        // <h1>nav</h1>
    );
}
 
export default Nav;