import React, {Component} from 'react';
import {Button, Nav, Navbar, Container, Form, NavDropdown} from "react-bootstrap";
import Cookies from "universal-cookie";
import swal from "sweetalert";
import NavStyle from "./css/NavStyle.css";
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Controladora from "../Controladora/Controladora"
import Publicacion from "../modelo/Publicacion";

const cookies = new Cookies();

export default class Galeria extends Component{

    state = {
        publicaciones: [],
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
        this.obtenerPublicaciones();    
    }

    obtenerPublicaciones = async(idCategoria = null) => {
        let controladora = new Controladora();
        if(idCategoria == null){
            let publicaciones = await controladora.obtenerPublicaciones();
            this.setState({
                publicaciones: publicaciones
            })
        } else{
            // prublicaciones filtradas
        }
    }

    eliminarPublicacion = async(idPublicacion) => {
        let controladora = new Controladora();
        try{
            await controladora.eliminarPublicacion(idPublicacion).then(value => swal("Publicacion eliminada", "", "success"));
            window.location.href='/galeria';
        } catch (err){
            swal("Error al eliminar","", "warning");
        }
    }

    render(){
        return(
            <div>
                <Navbar id="#navBar" collapseOnSelect bg="secondary" variant="light" expand="lg">
                    <Container>
                        <Navbar.Brand id="navTitle" href="">Galería de Duende</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                {cookies.get('rol') === "COMUN" && cookies.get('correo') !== undefined ? <Nav.Link className="botonNav" href="/Carrito">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                                    </svg>
                                </Nav.Link>: <div></div>}
                                <Nav.Link className="botonNav" href="/Tienda">Tienda</Nav.Link>
                                <Nav.Link className="botonNav" href="/Agenda">Agenda</Nav.Link>
                                {cookies.get('rol') === "ADMIN" && cookies.get('correo') !== undefined ? <Nav.Link className="botonNav" href="/VerCategorias">Ver Categorías</Nav.Link>: <div></div>}
                                {cookies.get('rol') === "ADMIN" && cookies.get('correo') !== undefined ? <Nav.Link className="botonNav" href="/CrearPublicacion">Crear Publicación</Nav.Link>: <div></div>}
                            </Nav>
                            <Nav>
                                {cookies.get('correo') === undefined? 
                                <Nav.Link className="botonNav" href="/">Iniciar Sesión</Nav.Link>:
                                <div></div>}
                                {cookies.get('correo') === undefined? 
                                <Nav.Link className="botonNav" href="/Registrarse">Registrarse</Nav.Link>:
                                <div></div>}
                            </Nav>
                            <Nav>
                                <Form.Control className="botonNav" type="text" name = 'correo' />
                            </Nav>
                            <Nav>
                                <Nav.Link className="botonNav" href="">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                </svg>
                                </Nav.Link>
                                {cookies.get('correo') !== undefined? 
                                <Nav.Link className="botonNav" onClick={()=>this.cerrarSesion()}>Cerrar Sesión</Nav.Link>:
                                <div></div>}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <div>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <br/>
                        <Form.Group onChange= {this.handleChange}>
                            <Row xs={1} md={3} className="g-4">
                                {this.state.publicaciones.map((publicacion) => (
                                    <Col>
                                        <Card>
                                            <Card.Img variant="top" src={`${process.env.PUBLIC_URL}/assets/images/${publicacion.imagen}`} />
                                            <Card.Body>
                                            <Card.Title>{publicacion.descripcion}</Card.Title>
                                            <Card.Text>
                                                Tags: {publicacion.tags}
                                            </Card.Text>
                                            <Card.Text>
                                                Categoría: {publicacion.categoria}
                                            </Card.Text>
                                            <Card.Text>
                                                Subcategoría: {publicacion.subcategoria}
                                            </Card.Text>
                                            <Button size="md" variant="secondary" type="submit">
                                                Comentar
                                            </Button>{' '}
                                            <Button size="md" variant="secondary"  type="submit">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                                  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                                </svg>
                                            </Button>{' '}
                                            <Button size="md" variant="secondary" type="submit" onClick = {() => this.eliminarPublicacion(publicacion.id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                                  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                                </svg>
                                            </Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Form.Group>
                    </Form.Group>
                </div >
            </div>
        )
    }
}