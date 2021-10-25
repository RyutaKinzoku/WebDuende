import React, { Component } from 'react';
import {Button, Nav, Navbar, NavDropdown, Container} from "react-bootstrap";
import Cookies from "universal-cookie";
import NavStyle from "./css/NavStyle.css";

const cookies = new Cookies();

export default class BarraNavegacion extends Component{
    cerrarSesion = () => {}

    render() {
        return(
            <Navbar id="#navBar" collapseOnSelect bg="secondary" variant="light" expand="lg">
                <Container>
                    <Navbar.Brand id="loginTitle" href="#loginTitle">Iniciar Sesión</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link className="botonNav" href="#shoppingcart">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                                </svg>
                            </Nav.Link>
                            <Nav.Link className="botonNav" href="#galery">Galería</Nav.Link>
                            <Nav.Link className="botonNav" href="#agenda">Agenda</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link className="botonNav" href="#sign-in">Registrarse</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            

        )
    }
}