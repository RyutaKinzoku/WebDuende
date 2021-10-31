import React, {Component} from 'react';
import {Button, Nav, Navbar, Container, Form, NavDropdown, ButtonGroup} from "react-bootstrap";
import Cookies from "universal-cookie";
import swal from "sweetalert";
import NavStyle from "./css/NavStyle.css";
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Controladora from "../Controladora/Controladora"
import Producto from "../modelo/Producto";

const cookies = new Cookies();

export default class Tienda extends Component{

    state = {
        productos: []
    }

    handleChange = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    componentDidMount() {
        this.obtenerProductos();    
    }

    eliminarProducto = async(idProducto) => {
        let controladora = new Controladora();
        let res = await controladora.eliminarProducto(idProducto);
        window.location.href='/Tienda'
        if(res.data[0] === 1){
            swal("Producto eliminado", "", "success");
        } else {
            swal("Error al eliminar","", "warning");
        }
    }

    obtenerProductos = async() => {
        let controladora = new Controladora();
        let productos = await controladora.obtenerProductos();
        this.setState({
            productos: productos
        })
    }

    modificarProducto = async(idProducto) => {
        window.location.href = `/modificarProducto/${idProducto}`
    }

    agregarProductoCarrito = async(idProducto) => {
        let controladora = new Controladora();
        let correo = cookies.get('corrreo');
        let response = await controladora.agregarProductoCarrito(correo, idProducto);
        if(response == 1){
            await swal("Producto agregado", "", "success");
        } else {
            swal("Error al agregar","", "warning");
        }
    }

    render(){
        return(
            <div>
                <Navbar id="#navBar" collapseOnSelect bg="secondary" variant="light" expand="lg">
                    <Container>
                        <Navbar.Brand id="navTitle" href="">Tienda de Duende</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link className="botonNav" href="/Carrito">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                                    </svg>
                                </Nav.Link>
                                <Nav.Link className="botonNav" href="/galeria">Galería</Nav.Link>
                                <Nav.Link className="botonNav" href="/Agenda">Agenda</Nav.Link>
                                <Nav.Link className="botonNav" href="/CrearProducto">Crear Producto</Nav.Link>
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
                        <div>
                            <br/>
                            <Row xs={1} md={3} className="g-4">
                                    {this.state.productos.map((producto => (
                                        <Col>
                                            <Card>
                                                <Card.Img variant="top" src={`${process.env.PUBLIC_URL}/assets/images/${producto.imagen}`} />
                                                <Card.Body>
                                                    <Card.Title>
                                                        {producto.nombre}
                                                        <br/>
                                                        {producto.descripcion}
                                                    </Card.Title>
                                                    <Card.Text>
                                                        ₡ {producto.precio}
                                                    </Card.Text>
                                                    <Form.Group onChange= {this.handleChange}>
                                                        <Row>
                                                            <h6>Cantidad:</h6>
                                                            <Col sm={2}>
                                                                <Form.Control type="text" name = 'cantidad' />
                                                            </Col>
                                                            <Col>
                                                                <Row>
                                                                    <Col sm={4}>
                                                                        <Button variant="secondary">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16">
                                                                              <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                                                                            </svg>
                                                                        </Button>
                                                                        <Button variant="secondary">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                                                                              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                                                            </svg>
                                                                        </Button>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col sm={2}>

                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                        </Row>
                                                        <br/>
                                                    </Form.Group>{' '}
                                                    <Button size="md" variant="secondary"  type="submit" onClick = {() => this.agregarProductoCarrito(producto.id)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-plus-fill" viewBox="0 0 16 16">
                                                          <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0z"/>
                                                        </svg>
                                                    </Button>{' '}
                                                    <Button size="md" variant="secondary"  type="submit" onClick = {() => this.modificarProducto(producto.id)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                                          <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                                        </svg>
                                                    </Button>{' '}
                                                    <Button size="md" variant="secondary" type="submit" onClick = {() => this.eliminarProducto(producto.id)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                                          <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                                        </svg>
                                                    </Button>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    )))}
                            </Row>
                        </div>
                    </Form.Group>
                </div>
            </div>
        )
    }
}