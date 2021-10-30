import React, {Component} from 'react';
import {Button, Nav, Navbar, Container, Form } from "react-bootstrap";
import Cookies from "universal-cookie";
import swal from "sweetalert";
import NavStyle from "./css/NavStyle.css";

const cookies = new Cookies();

export default class Compromisos extends Component{

    handleChange = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    enviar  = async (e) => {}

    render(){
        return(
            <div>
                <Navbar id="#navBar" collapseOnSelect bg="secondary" variant="light" expand="lg">
                    <Container>
                        <Navbar.Brand id="navTitle" href="">Seleccione el tipo de compromiso</Navbar.Brand>
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
                <div className="center container w-50 p-8 py-2 my-3  mt-5">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                        <div className="d-grid gap-2">
                            <Button size="md" variant="secondary" type="submit" href="/DatosCompromiso">
                                Entrega
                            </Button>
                            <Button size="md" variant="secondary" type="submit" href="/UsuarioCompromiso">
                                Cita
                            </Button>
                            <Button size="md" variant="secondary" type="submit" href="/CrearCurso">
                                Curso
                            </Button>
                        </div>
                    </Form.Group>
                </div >
            </div>
        )
    }
}