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
        productos: [],
        cantidad: '1',
    }

    cerrarSesion = () =>{
        cookies.remove('correo',    {path: "/"});
        cookies.remove('rol',       {path: "/"});
        window.location.href="/";
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
        try{
            controladora.eliminarProducto(idProducto);
            swal("Producto eliminado", "", "success");
            window.location.href='/Tienda';
        } catch (err){
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
    
    agregarProductoCarrito = async(idProducto,cantidad) => {
        if (cantidad > 0){
            let controladora = new Controladora();
            let cantidad = document.getElementById(idProducto).value;
            let correo = cookies.get('correo');
            let response = await controladora.agregarProductoCarrito(correo, idProducto, cantidad);
            if(response.data === true){
                await swal("Producto agregado", "", "success");
            } else {
                swal("Error al agregar","", "warning");
            }
        }else{
            swal("El producto no est?? disponible","", "warning");
        }
    }

    subir = async(id, max) => {
        if (Number(document.getElementById(id).value) < max){
            document.getElementById(id).value = Number(document.getElementById(id).value) + 1;
        }else{
            swal("No hay suficiente producto en stock","", "warning");
        }
    }

    bajar = async(id) =>{
        if (Number(document.getElementById(id).value) > 1){
            document.getElementById(id).value = Number(document.getElementById(id).value) - 1;
        }
    }
    render(){
        return(
            <div>
                <Navbar fixed="top" id="#navBar" collapseOnSelect bg="secondary" variant="light" expand="lg">
                    <Container>
                        <Navbar.Brand id="navTitle" href="">Tienda de Duende</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                            {cookies.get('rol') === "COMUN" && cookies.get('correo') !== undefined ?
                            <Nav.Link className="botonNav" href="/Carrito">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                            </svg>
                            </Nav.Link>:<div></div>}
                                <Nav.Link className="botonNav" href="/galeria">Galer??a</Nav.Link>
                                {cookies.get('rol') === "ADMIN" && cookies.get('correo') !== undefined ?<Nav.Link className="botonNav" href="/Agenda">Agenda</Nav.Link>:<div></div>}
                                {cookies.get('rol') === "ADMIN" && cookies.get('correo') !== undefined ?<Nav.Link className="botonNav" href="/CrearProducto">Crear Producto</Nav.Link>:<div></div>}
                                {cookies.get('rol') === "ADMIN" && cookies.get('correo') !== undefined ?<Nav.Link className="botonNav" href="/FrecuenciaUsuarios">Frecuencia Usuarios</Nav.Link>:<div></div>}
                            </Nav>
                            <Nav>
                                {cookies.get('correo') !== undefined? 
                                <Nav.Link className="botonNav" onClick={()=>this.cerrarSesion()}>Cerrar Sesi??n</Nav.Link>:
                                <div></div>}
                                {cookies.get('correo') === undefined? 
                                <Nav.Link className="botonNav" href="/">Iniciar Sesi??n</Nav.Link>:
                                <div></div>}
                                {cookies.get('correo') === undefined? 
                                <Nav.Link className="botonNav" href="/Registrarse">Registrarse</Nav.Link>:
                                <div></div>}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <div>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <div>
                        <br/>
                    <br/>
                    <br/>
                   
                            <Row xs={1} md={3} className="g-4">
                                    {this.state.productos.map((producto => (
                                        <Col>
                                            <Card>
                                                <Card.Img variant="top" src={`https://webduende.s3.amazonaws.com/${producto.imagen}`} />
                                                <Card.Body>
                                                    <Card.Title>
                                                        {producto.nombre}
                                                        <br/>
                                                        {producto.descripcion}
                                                    </Card.Title>
                                                    <Card.Text>
                                                        ??? {producto.precio}
                                                    </Card.Text>
                                                    <Form.Group onChange= {this.handleChange}>
                                                        <Row>
                                                            <h6>Cantidad: {producto.cantidad}</h6>
                                                            {cookies.get('rol') === "COMUN" && cookies.get('correo') !== undefined ?
                                                            <Col sm={2}>
                                                                {producto.cantidad > 0 ?
                                                                    <Form.Control readOnly id={producto.id} type="text readonly" name = 'cantidad' defaultValue='1'/>
                                                                :<div></div>}
                                                                {producto.cantidad === 0 ?
                                                                    <Form.Control readOnly id={producto.id} type="text readonly" name = 'cantidad' defaultValue='0'/>
                                                                :<div></div>}
                                                            </Col>
                                                            :<div></div>}
                                                            {cookies.get('rol') === "COMUN" && cookies.get('correo') !== undefined ?
                                                            <Col>
                                                                <Row>
                                                                    <Col sm={4}>
                                                                        <Button variant="secondary" onClick = {() => this.bajar(producto.id)}>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16">
                                                                              <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                                                                            </svg>
                                                                        </Button>
                                                                        <Button variant="secondary" onClick = {() => this.subir(producto.id, producto.cantidad)}>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                                                                              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                                                            </svg>
                                                                        </Button>
                                                                    </Col>
                                                                    <Col>
                                                                    {cookies.get('rol') === "COMUN" && cookies.get('correo') !== undefined ?
                                                                        <Button size="md" variant="secondary"  type="submit" onClick = {() => this.agregarProductoCarrito(producto.id, producto.cantidad)}>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-plus-fill" viewBox="0 0 16 16">
                                                                            <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0z"/>
                                                                            </svg>
                                                                        </Button>
                                                                    :<div></div>}{' '}
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col sm={2}>
                                                                    
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                        : <div></div>}
                                                        </Row>
                                                        <br/>
                                                    </Form.Group>{' '}
                                                    {cookies.get('rol') === "ADMIN" && cookies.get('correo') !== undefined ?
                                                    <Button size="md" variant="secondary"  type="submit" onClick = {() => this.modificarProducto(producto.id)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                                          <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                                        </svg>
                                                    </Button>:<div></div>}{' '}
                                                    {cookies.get('rol') === "ADMIN" && cookies.get('correo') !== undefined ?
                                                    <Button size="md" variant="secondary" type="submit" onClick = {() => this.eliminarProducto(producto.id)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                                          <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                                        </svg>
                                                    </Button>:<div></div>}{' '}
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