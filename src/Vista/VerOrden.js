import React, {Component} from 'react';
import {Button, Nav, Navbar, Container, Form } from "react-bootstrap";
import Cookies from "universal-cookie";
import swal from "sweetalert";
import NavStyle from "./css/NavStyle.css";
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const cookies = new Cookies();

export default class VerOrden extends Component{


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
                        <Navbar.Brand id="navTitle" href="">Orden</Navbar.Brand>
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
                <div>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <br/>
                        <Form.Group onChange= {this.handleChange}>
                            <Row xs={1} md={1} className="g-4">
                                {Array.from({ length: 4 }).map((_, idx) => (
                                    <Card>
                                    <Card.Img variant="top" src="holder.js/100px160" />
                                    <Card.Body>
                                            <Row>
                                            <Col>
                                            <Card.Title>Producto:</Card.Title>
                                            <Card.Text>
                                                Producto
                                            </Card.Text>
                                            </Col>
                                            <Col>
                                            <Card.Title>Cantidad:</Card.Title>
                                            <Card.Text>
                                                Cantidad
                                            </Card.Text>
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
                        <Nav.Link className="botonNav" href="/DatosCompromiso">Crear Entrega</Nav.Link>
                    </Nav>
                </Navbar>
            </div>
        )
    }
}