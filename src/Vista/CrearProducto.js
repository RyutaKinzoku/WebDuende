import React, {Component} from 'react';
import {Button, Nav, Navbar, Container, Form } from "react-bootstrap";
import Cookies from "universal-cookie";
import swal from "sweetalert";
import NavStyle from "./css/NavStyle.css";
import Dropdown from '@restart/ui/esm/Dropdown';

const cookies = new Cookies();

export default class CrearProducto extends Component{

    state = {
        nombre:'',
        descripcion:'',
        precio:'',
        imagen:'',
    }

    handleChange = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    enviar  = async (e) => {}

    render(){
        return(
            <div>
                <Navbar id="#navBar" collapseOnSelect bg="secondary" variant="light" expand="lg">
                    <Container>
                        <Navbar.Brand id="loginTitle" href="#loginTitle">Crear Producto</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link className="botonNav" href="#tienda">Tienda</Nav.Link>
                                <Nav.Link className="botonNav" href="#galery">Galería</Nav.Link>
                                <Nav.Link className="botonNav" href="#agenda">Agenda</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <div className="center container w-50 p-8 py-2 my-3  mt-5">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <div>
                            <Form.Group onChange= {this.handleChange}>
                                <h6>Por favor, ingrese los siguientes datos: </h6>
                                <br/>
                                <h6>Nombre:</h6>
                                <Form.Control type="text" name='nombre' />
                                <br/>
                                <h6>Descripcion:</h6>
                                <Form.Control type="text" name = 'descripcion' />
                                <br/>
                                <h6>Precio:</h6>
                                <Form.Control type="text" name = 'precio' />
                                <br/>
                                <h6>Imagen:</h6>
                                <Form.Control type="file" name='imagen' />
                                <br/>
                            </Form.Group>

                        </div>
                        <div className="d-grid gap-2">
                            <Button size="md" variant="secondary" type="submit">
                                Publicar
                            </Button>
                            <Button size="md" variant="secondary" type="submit">
                                Cancelar
                            </Button>
                        </div>
                    </Form.Group>
                </div >
            </div>
        )
    }
}