import React, {Component} from 'react';
import {Button, Nav, Navbar, Container, Form } from "react-bootstrap";
import Cookies from "universal-cookie";
import swal from "sweetalert";
import NavStyle from "./css/NavStyle.css";
import Controladora from "../Controladora/Controladora"

const cookies = new Cookies();

export default class IniciarSesion extends Component{

    state = {
        correo: '',
        contrasena: '',
    }

    handleChange = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    enviar = async (e) => {
        let controladora = new Controladora();
        let usuario = await controladora.iniciarSesion(this.state.correo, this.state.contrasena);
        if(usuario !== null){
            cookies.set('correo',            usuario.correo,            {path: "/"});
            cookies.set('nombre',            usuario.nombre,            {path: "/"});
            cookies.set('primerApellido',    usuario.primerApellido,    {path: "/"});
            cookies.set('segundoApellido',   usuario.segundoApellido,   {path: "/"});
            cookies.set('telefono',          usuario.telefono,          {path: "/"});
            cookies.set('cedula',            usuario.cedula,            {path: "/"});
            cookies.set('rol',               usuario.rol,               {path: "/"});
            swal("Usuario encontrado","" ,"success").then((value) => {
                window.location.href="/galeria";
            });
        }else{
            swal("Usuario incorrecto","" ,"warning");
        }
    }

    render(){
        return(
            <div>
                <Navbar id="#navBar" collapseOnSelect bg="secondary" variant="light" expand="lg">
                    <Container>
                        <Navbar.Brand id="navTitle" href="">Iniciar Sesión</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link className="botonNav" href="">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                                    </svg>
                                </Nav.Link>
                                <Nav.Link className="botonNav" href="/galeria">Galería</Nav.Link>
                                <Nav.Link className="botonNav" href="/Tienda">Tienda</Nav.Link>
                                <Nav.Link className="botonNav" href="/Agenda">Agenda TEMP</Nav.Link>
                            </Nav>
                            <Nav>
                                <Nav.Link className="botonNav" href="/Registrarse">Registrarse</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <div className="center container w-50 p-8 py-2 my-3  mt-5">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <div>
                            <Form.Group onChange= {this.handleChange}>
                                <h6>Por favor, ingrese los siguientes datos: </h6>
                                <br/>
                                <h6>Correo:</h6>
                                <Form.Control type="text" name = 'correo' />
                                <br/>
                                <h6>Contraseña:</h6>
                                <Form.Control type="password" name = 'contrasena' />
                                <br/>
                            </Form.Group>

                        </div>
                        <div className="d-grid gap-2">
                            <Button size="md" variant="secondary" type="submit" onClick={this.enviar}>
                                Iniciar Sesión
                            </Button>
                        </div>
                    </Form.Group>
                </div >
            </div>
        )
    }
}