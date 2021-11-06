import React, {Component} from 'react';
import {Button, Nav, Navbar, Container, Form } from "react-bootstrap";
import Cookies from "universal-cookie";
import swal from "sweetalert";
import NavStyle from "./css/NavStyle.css";
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Controladora from '../Controladora/Controladora';

const cookies = new Cookies();

export default class Ordenes extends Component{

    state = {
        ordenes: []
    }

    handleChange = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    componentDidMount(){
        this.obtenerOrdenes();
    }

    obtenerOrdenes  = async (e) => {
        let controladora = new Controladora();
        let ordenes = await controladora.obtenerOrdenes();
        console.log(ordenes);
        this.setState({
            ordenes: ordenes
        });
    }

    render(){
        return(
            <div>
                <Navbar id="#navBar" collapseOnSelect bg="secondary" variant="light" expand="lg">
                    <Container>
                        <Navbar.Brand id="navTitle" href="">Ordenes</Navbar.Brand>
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
                <div className="center container w-70 p-8 py-2 my-3  mt-5"> 
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Group onChange= {this.handleChange}>
                            <Row xs={1} md={1} className="g-4">
                                {this.state.ordenes.map(orden => (
                                    <Card>
                                    <Card.Body>
                                        <Row>
                                        <Col sm={2}>
                                            <Card.Img variant="top" src={`${process.env.PUBLIC_URL}/assets/images/${orden.comprobante}`} />
                                        </Col>
                                        <Col>
                                        <Card.Title>Usuario:</Card.Title>
                                        <Card.Text>
                                            {orden.comprador}
                                        </Card.Text>
                                        </Col>
                                        <Col>
                                        <Card.Title>Dirección:</Card.Title>
                                        <Card.Text>
                                            {orden.direccion}
                                        </Card.Text>
                                        </Col>
                                        <Col>
                                        <Card.Title>ID:</Card.Title>
                                        <Card.Text>
                                            {orden.id}
                                        </Card.Text>
                                        </Col>
                                        <Col>
                                        <Button size="md" variant="secondary" type="submit" href="/VerOrden">
                                            Ver
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
            </div>
        )
    }
}