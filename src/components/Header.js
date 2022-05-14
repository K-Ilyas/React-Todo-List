import React from 'react'
import { Navbar, Container } from "react-bootstrap"

function Header() {
    return (
        <Navbar expand="md" id="navbar">
            <Container>
                <Navbar.Brand href="#" id="title">Todo List</Navbar.Brand>
            </Container>
        </Navbar>
    )
}

export default Header