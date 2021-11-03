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

export default class Carrito extends Component{

    state = {
        productosCarrito: [],
        precioTotal: 0,
    }

    handleChange = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    componentDidMount() {
        this.obtenerProductosCarrito();
    }

    eliminarProductoCarrito = async(idProducto) => {
        let controladora = new Controladora();
        let correo = cookies.get('correo');
        let response = await controladora.eliminarProductoCarrito(correo, idProducto);
        window.location.href='/Carrito'
        if(response.data === true){
            await swal("Producto eliminado", "", "success");
        } else {
            swal("Error al eliminar","", "warning");
        }
    }

    obtenerProductosCarrito = async() => {
        let controladora = new Controladora();
        let correo = cookies.get('correo');
        let productosCarrito = await controladora.obtenerProductosCarrito(correo);
        productosCarrito.map(async producto => {
            this.state.precioTotal += Number(producto.cantidad)*Number(producto.precio);
        })
        this.setState({
            productosCarrito: productosCarrito
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
                                {this.state.productosCarrito.map((productoCarrito => (
                                    <Card>
                                        <Card.Body>
                                            <Row>
                                            <Col sm={1}>
                                                <Card.Img variant="top"  src={`${process.env.PUBLIC_URL}/assets/images/${productoCarrito.imagen}`} />
                                            </Col>
                                            <Col>
                                            <Card.Title>Descripción:</Card.Title>
                                            <Card.Text>
                                                {productoCarrito.descripcion}
                                
                                            </Card.Text>
                                            </Col>
                                            <Col>
                                            <Card.Title>Precio:</Card.Title>
                                            <Card.Text>
                                                ₡ {productoCarrito.precio}
                                            </Card.Text>
                                            </Col>
                                            <Col>
                                            <Card.Title>Cantidad:</Card.Title>
                                            <Card.Text>
                                                {productoCarrito.cantidad}
                                            </Card.Text>
                                            </Col>
                                            <Col>
                                            <Card.Title>Subtotal:</Card.Title>
                                            <Card.Text>
                                                ₡ {Number(productoCarrito.cantidad)*Number(productoCarrito.precio)}
                                            </Card.Text>
                                            </Col>
                                            <Col>
                                            <Button size="md" variant="secondary" type="submit"  onClick = {() => this.eliminarProductoCarrito(productoCarrito.id)}>
                                                Borrar
                                            </Button>
                                            </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                )))}
                            </Row>
                        </Form.Group>
                    </Form.Group>
                </div>
                <Navbar fixed="bottom" id="#navBarBottom" collapseOnSelect bg="" variant="light" expand="lg">
                    <Container>
                    </Container>
                        <Navbar.Brand id="navTitle2" href="">Total: ₡ {Number(this.state.precioTotal)}</Navbar.Brand>
                        <Nav.Link className="botonNav2" href="/Comprar">Comprar</Nav.Link>
                </Navbar>
            </div>
        )
    }
}