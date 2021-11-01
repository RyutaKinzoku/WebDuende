import React, {Component} from 'react';
import {Button, Nav, Navbar, Container, Form } from "react-bootstrap";
import Cookies from "universal-cookie";
import swal from "sweetalert";
import NavStyle from "./css/NavStyle.css";
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Dropdown from '@restart/ui/esm/Dropdown';
import { DropdownButton } from 'react-bootstrap';
import Controladora from "../Controladora/Controladora";

const cookies = new Cookies();

export default class VerCategorias extends Component{

    state = {
        categorias: []
    }
    
    handleChange = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    componentDidMount() {
        this.obtenerCategorias();    
    }

    obtenerCategorias = async() => {
        let controladora = new Controladora();
        let categorias = await controladora.obtenerCategorias();
        this.setState({
            categorias: categorias
        });
    }

    render(){
        return(
            <div>
                <Navbar id="#navBar" collapseOnSelect bg="secondary" variant="light" expand="lg">
                    <Container>
                        <Navbar.Brand id="navTitle" href="">Categorías</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link className="botonNav" href="/Tienda">Tienda</Nav.Link>
                                <Nav.Link className="botonNav" href="/Galeria">Galería</Nav.Link>
                                <Nav.Link className="botonNav" href="/Agenda">Agenda</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <div className="center container w-50 p-8 py-2 my-3  mt-5">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Group onChange= {this.handleChange}>
                            <Row xs={1} md={1} className="g-4">
                                {this.state.categorias.map(categoria => (
                                    <Card>
                                    <Card.Body>
                                        <Row>
                                        <Col>
                                        <Card.Title>{categoria.nombre}</Card.Title>
                                        </Col>
                                        <Col>
                                        </Col>
                                        <Col>
                                        </Col>
                                        <Col>
                                        <Button size="md" variant="secondary" type="submit" href="/VerSubcategorias">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                                        </svg>
                                        </Button>
                                        </Col>
                                        </Row>
                                    </Card.Body>
                                    </Card>
                                ))}
                            </Row>
                        </Form.Group>
                    </Form.Group>
                </div>
                <Navbar fixed="bottom" id="#navBarBottom" collapseOnSelect bg="" variant="light" expand="lg">
                    <Container>
                    </Container>
                        <Row>
                            <Col>
                                <Nav.Link className="botonNav2" href="/CrearCategoria">Crear Categoría</Nav.Link>{' '}
                            </Col>
                            <Col>
                                <Nav.Link className="botonNav2" href="/Galeria">Volver</Nav.Link>{' '}
                            </Col>
                        </Row>
                </Navbar>
            </div>
        )
    }
}