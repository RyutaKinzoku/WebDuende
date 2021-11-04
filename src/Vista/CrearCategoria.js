import React, {Component} from 'react';
import {Button, Nav, Navbar, Container, Form } from "react-bootstrap";
import Cookies from "universal-cookie";
import swal from "sweetalert";
import NavStyle from "./css/NavStyle.css";
import Dropdown from '@restart/ui/esm/Dropdown';
import Controladora from '../Controladora/Controladora';

const cookies = new Cookies();

export default class CrearCategoria extends Component{

    state = {
        nombre:'',
    }

    handleChange = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    agregar  = async (e) => {
        let controladora = new Controladora();
        let response = await controladora.agregarCategoria(this.state.nombre);
        if(!response.data){
            swal("Categoria creada exitosamente","" ,"success").then((value) => {
                window.location.href="/VerCategorias";
            })
        }else{
            console.log(response);
        }
    }

    enviar  = async (e) => {}

    render(){
        return(
            <div>
                <Navbar id="#navBar" collapseOnSelect bg="secondary" variant="light" expand="lg">
                    <Container>
                        <Navbar.Brand id="navTitle" href="">Crear Categoría</Navbar.Brand>
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
                        <div>
                            <Form.Group onChange= {this.handleChange}>
                                <h6>Por favor, ingrese el nombre de la categoría: </h6>
                                <br/>
                                <h6>Nombre:</h6>
                                <Form.Control type="text" name='nombre' />
                                <br/>
                            </Form.Group>

                        </div>
                        <div className="d-grid gap-2">
                            <Button size="md" variant="secondary" onClick = {() => this.agregar()}>
                                Crear
                            </Button>
                            <Button size="md" variant="secondary" type="submit">
                                Cancelar
                            </Button>
                        </div>
                    </Form.Group>
                </div >
            </div>
        )
    }
}