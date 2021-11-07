import React, {Component} from 'react';
import {Button, Nav, Navbar, Container, Form } from "react-bootstrap";
import Cookies from "universal-cookie";
import swal from "sweetalert";
import NavStyle from "./css/NavStyle.css";
import Controladora from "../Controladora/Controladora";
import DTOUsuario from "../modelo/DTOUsuario";

const cookies = new Cookies();

export default class Registrarse extends Component{
    state = {
        correo: '',
        contrasena: '',
        confirmacion: '',
        cedula: '',
        nombre: '',
        primerApellido: '',
        segundoApellido: '',
        telefono: '',
    }

    handleChange = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    registrar = async (e) => {
        e.preventDefault();
        if(this.state.correo !== "" && this.state.nombre !== "" && this.state.primerApellido !== "" && this.state.segundoApellido !== "" && this.state.telefono !== "" && this.state.cedula !== "" && this.state.contrasena !== "" && this.state.confirmacion !== ""){
            if(this.state.contrasena === this.state.confirmacion){
                let datosUsuario = new DTOUsuario(this.state.correo, this.state.nombre, this.state.primerApellido, this.state.segundoApellido, this.state.telefono, this.state.cedula, this.state.contrasena, "COMUN");
                let controladora = new Controladora();
                let response = await controladora.registrarse(datosUsuario);
                if(!response.data){
                    swal("Registro completo","" ,"success").then((value) => {
                        window.location.href="/";
                    })
                }else{
                    swal("Error al registrar","", "warning");
                }
            } else {
                swal("Las contraseñas no coinciden","", "warning");
            }
        } else {
            swal("Alguna casilla se encuentra vacía","" ,"warning");
        }
    };

    render(){
        return(
            <div>
                <Navbar id="#navBar" collapseOnSelect bg="secondary" variant="light" expand="lg">
                    <Container>
                        <Navbar.Brand id="navTitle" href="">Registro</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link className="botonNav" href="/Galeria">Galería</Nav.Link>
                                <Nav.Link className="botonNav" href="/Tienda">Tienda</Nav.Link>
                            </Nav>
                            <Nav>
                                <Nav.Link className="botonNav" href="/">Iniciar Sesión</Nav.Link>
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
                                <h6>Confirmar contraseña:</h6>
                                <Form.Control type="password" name = 'confirmacion' />
                                <br/>
                                <h6>Cédula:</h6>
                                <Form.Control type="text" name = 'cedula' />
                                <br/>
                                <h6>Nombre:</h6>
                                <Form.Control type="text" name = 'nombre' />
                                <br/>
                                <h6>Primer Apellido:</h6>
                                <Form.Control type="text" name = 'primerApellido' />
                                <br/>
                                <h6>Segundo Apellido:</h6>
                                <Form.Control type="text" name = 'segundoApellido' />
                                <br/>
                                <h6>Teléfono:</h6>
                                <Form.Control type="text" name = 'telefono' />
                                <br/>
                            </Form.Group>

                        </div>
                        <div className="d-grid gap-2">
                            <Button size="md" variant="secondary" type="submit" onClick={this.registrar}>
                                Registrarse
                            </Button>
                        </div>
                    </Form.Group>
                </div >
            </div>
        )
    }
}