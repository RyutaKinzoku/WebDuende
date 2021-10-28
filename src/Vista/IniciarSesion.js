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

    componentDidMount() {
        if(cookies.get('correo')){
            window.location.href="/galeria";
        }
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
            cookies.set('correo',          usuario.correo,            {path: "/"});
            cookies.set('rol',               usuario.rol,               {path: "/"});
            swal("Usuario encontrado","" ,"success").then((value) => {
                window.location.href="/Galeria";
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
                                <Nav.Link className="botonNav" href="/Galeria">Galería</Nav.Link>
                                <Nav.Link className="botonNav" href="/Tienda">Tienda</Nav.Link>
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