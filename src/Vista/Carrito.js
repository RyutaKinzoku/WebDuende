import React, {Component} from 'react';
import {Button, Nav, Navbar, Container, Form } from "react-bootstrap";
import Cookies from "universal-cookie";
import swal from "sweetalert";
import NavStyle from "./css/NavStyle.css";
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const cookies = new Cookies();

export default class Carrito extends Component{


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
                        <Navbar.Brand id="navTitle" href="">Carrito</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link className="botonNav" href="/Tienda">Tienda</Nav.Link>
                                <Nav.Link className="botonNav" href="/Galeria">Galería</Nav.Link>
                                <Nav.Link className="botonNav" href="/Agenda">Agenda</Nav.Link>
                            </Nav>
                            <Nav>
                                <Nav.Link className="botonNav" href="/">Iniciar Sesión</Nav.Link>
                                <Nav.Link className="botonNav" href="/Registrarse">Registrarse</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <div>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <br/>
                        <Form.Group onChange= {this.handleChange}>
                            <Row xs={1} md={1} className="g-4">
                                {Array.from({ length: 10 }).map((_, idx) => (
                                    <Card>
                                        <Card.Img variant="top" src="holder.js/100px160" />
                                        <Card.Body>
                                            <Row>
                                            <Col>
                                            <Card.Title>Descripción:</Card.Title>
                                            <Card.Text>
                                                Texto
                                            </Card.Text>
                                            </Col>
                                            <Col>
                                            <Card.Title>Precio:</Card.Title>
                                            <Card.Text>
                                                Precio
                                            </Card.Text>
                                            </Col>
                                            <Col>
                                            <Card.Title>Cantidad:</Card.Title>
                                            <Card.Text>
                                                Cantidad
                                            </Card.Text>
                                            </Col>
                                            <Col>
                                            <Card.Title>Subtotal:</Card.Title>
                                            <Card.Text>
                                                Total
                                            </Card.Text>
                                            </Col>
                                            <Col>
                                            <Button size="md" variant="secondary" type="submit">
                                                Borrar
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
                <Navbar fixed="bottom" id="#navBarBottom" collapseOnSelect bg="secondary" variant="light" expand="lg">
                    <Container>
                    </Container>
                    <Nav className="me-auto">
                        <Navbar.Brand id="navTitle" href="">Total:</Navbar.Brand>
                        <Nav.Link className="botonNav" href="">Comprar</Nav.Link>
                    </Nav>
                </Navbar>
            </div>
        )
    }
}