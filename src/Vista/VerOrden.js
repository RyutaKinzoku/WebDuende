import React, {Component} from 'react';
import {Button, Nav, Navbar, Container, Form } from "react-bootstrap";
import Cookies from "universal-cookie";
import swal from "sweetalert";
import NavStyle from "./css/NavStyle.css";
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Controladora from "../Controladora/Controladora";

const cookies = new Cookies();

export default class VerOrden extends Component{

    state = {
        productos: [],
        precioTotal: 0
    }

    handleChange = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    componentDidMount() {
        this.obtenerProductosOrden();    
    }

    obtenerProductosOrden = async() => {
        console.log(this.props.match.params.id)
        let controladora = new Controladora();
        let productos = await controladora.obtenerProductosOrden(this.props.match.params.id);
        productos.map(async producto => {
            this.state.precioTotal += Number(producto.cantidad)*Number(producto.precio);
        })
        this.setState({
            productos: productos
        });
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
                        <Navbar.Brand id="navTitle" href="">Total: ₡ {Number(this.state.precioTotal)}</Navbar.Brand>
                </Navbar>
                <div className="center container w-70 p-8 py-2 my-3  mt-5">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Group onChange= {this.handleChange}>
                            <Row xs={1} md={1} className="g-4">
                                {this.state.productos.map(producto => (
                                    <Card>
                                    <Card.Body>
                                            <Row>
                                            <Col sm={2}>
                                            <Card.Img variant="top" src={`${process.env.PUBLIC_URL}/assets/images/${producto.imagen}`} />
                                            </Col>   
                                            <Col>
                                            <Card.Title>Producto:</Card.Title>
                                            <Card.Text>
                                                {producto.nombre}
                                            </Card.Text>
                                            </Col>
                                            <Col>
                                            <Card.Title>Cantidad:</Card.Title>
                                            <Card.Text>
                                                {producto.cantidad}
                                            </Card.Text>
                                            <Card.Title>Subtotal:</Card.Title>
                                            <Card.Text>
                                                ₡ {Number(producto.cantidad)*Number(producto.precio)}
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
            </div>
        )
    }
}