import React, {Component} from 'react';
import {Button, Nav, Navbar, Container, Form, NavDropdown} from "react-bootstrap";
import Cookies from "universal-cookie";
import swal from "sweetalert";
import NavStyle from "./css/NavStyle.css";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const cookies = new Cookies();

export default class Galeria extends Component{

    state = {
        correo: '',
        contrasena: '',
    }

    handleChange = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    render(){
        return(
            <div>
                <Navbar id="#navBar" collapseOnSelect bg="secondary" variant="light" expand="lg">
                    <Container>
                        <Navbar.Brand id="navTitle" href="#navTitle">Galería de Duende</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link className="botonNav" href="#shoppingcart">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                                    </svg>
                                </Nav.Link>
                                <Nav.Link className="botonNav" href="#tienda">Tienda</Nav.Link>
                                <Nav.Link className="botonNav" href="#agenda">Agenda</Nav.Link>
                                <Nav.Link className="botonNav" href="#viewCategories">Ver Categorías</Nav.Link>
                                <Nav.Link className="botonNav" href="#createPublication">Crear Publicación</Nav.Link>
                            </Nav>
                            <Nav>
                                <Nav.Link className="botonNav" href="#login">Iniciar Sesión</Nav.Link>
                                <Nav.Link className="botonNav" href="#sign-in">Registrarse</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <Autocomplete
                    options={["Maquillaje Básico", "Caracterización", "Maquillaje para Bodas"]}
                    style={{ width: 250 }}
                    renderInput={(params) =>
                    <TextField {...params} label="Combo box" variant="outlined" />}
                />
                <div className="center container w-50 p-8 py-2 my-3  mt-5">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <div>
                            <Form.Group onChange= {this.handleChange}>
                                <h6>Por favor, ingrese los siguientes datos: </h6>
                                <br/>
                                <h6>Correo:</h6>
                                <Form.Control type="text" name = 'correo' />
                                <br/>
                                <h6>Contraseña:</h6>
                                <Form.Control type="password" name = 'contrasena' />
                                <br/>
                            </Form.Group>

                        </div>
                        <div className="d-grid gap-2">
                            <Button size="md" variant="secondary" type="submit">
                                Iniciar Sesión
                            </Button>
                        </div>
                    </Form.Group>
                </div >
            </div>
        )
    }
}