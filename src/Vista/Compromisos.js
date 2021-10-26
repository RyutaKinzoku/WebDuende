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
                        <Navbar.Brand id="loginTitle" href="#loginTitle">Seleccione el tipo de compromiso</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link className="botonNav" href="#tienda">Tienda</Nav.Link>
                                <Nav.Link className="botonNav" href="#galery">Galería</Nav.Link>
                                <Nav.Link className="botonNav" href="#agenda">Agenda</Nav.Link>
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
                            <Button size="md" variant="secondary" type="submit">
                                Entrega
                            </Button>
                            <Button size="md" variant="secondary" type="submit">
                                Cita
                            </Button>
                            <Button size="md" variant="secondary" type="submit">
                                Curso
                            </Button>
                        </div>
                    </Form.Group>
                </div >
            </div>
        )
    }
}