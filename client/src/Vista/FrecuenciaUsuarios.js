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

export default class FrecuenciaUsuarios extends Component{

    state = {
        usuarios: [],
        usuariosFrecuencia: []
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

    async componentDidMount() {
        await this.obtenerUsuarios();
        await this.obtenerUsuariosFrecuencia();    
        let usuariosFiltrados = []
        this.state.usuarios.map(usuario =>{
            if ((this.state.usuariosFrecuencia.filter(x => x===usuario.correo).length)!==0){
                usuariosFiltrados.push(usuario);
            }
        })
        this.setState({
            usuarios: usuariosFiltrados
        })
    }

    obtenerUsuarios = async() => {
        let controladora = new Controladora();
        let usuarios = await controladora.obtenerUsuarios();
        this.setState({
            usuarios: usuarios
        });
    }

    obtenerUsuariosFrecuencia = async() => {
        let controladora = new Controladora();
        let usuariosFrecuencia = await controladora.obtenerUsuariosFrecuencia();
        this.setState({
            usuariosFrecuencia: usuariosFrecuencia
        });
    }

    render(){
        return(
            <div>
                <Navbar fixed="top" id="#navBar" collapseOnSelect bg="secondary" variant="light" expand="lg">
                    <Container>
                        <Navbar.Brand id="navTitle" href="">Categorías</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link className="botonNav" href="/Tienda">Tienda</Nav.Link>
                                <Nav.Link className="botonNav" href="/Galeria">Galería</Nav.Link>
                                <Nav.Link className="botonNav" href="/Agenda">Agenda</Nav.Link>
                            </Nav>
                            <Nav>
                                {cookies.get('correo') !== undefined? 
                                <Nav.Link className="botonNav" onClick={()=>this.cerrarSesion()}>Cerrar Sesión</Nav.Link>:
                                <div></div>}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <div className="center container w-50 p-8 py-2 my-3  mt-5">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <br/>
                        <Form.Group onChange= {this.handleChange}>
                            <Row xs={1} md={1} className="g-4">
                                {this.state.usuarios.map(usuario => (
                                    <Card>
                                    <Card.Body>
                                        <Row>
                                        <Col sm={6}>
                                        <Card.Title>{usuario.correo}</Card.Title>
                                        </Col>
                                        <Col>
                                        <Card.Title>Cantidad de ingresos: {this.state.usuariosFrecuencia.filter(x => x===usuario.correo).length}</Card.Title>
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