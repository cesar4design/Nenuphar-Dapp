import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


import { useRouter } from 'next/router';

const NavbarComponent = () => {
    const router = useRouter();

    return (
        <>
            <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">Nenuphar</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Link className='nav-link' href="home">Home</Link>
                            <Link className='nav-link' href="discover">Discover</Link>
                            <Link className='nav-link' href="faucet">Faucet</Link>                           
                        </Nav>
                        <Nav>
                            <Link className='joinButton' href="join">Join</Link>   
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default NavbarComponent;
