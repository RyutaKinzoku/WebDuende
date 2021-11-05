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

export default class VerCategorias extends Component{

    state = {
        categorias: []
    }
    
    handleChange = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    componentDidMount() {
        this.obtenerCategorias();    
    }

    obtenerCategorias = async() => {
        let controladora = new Controladora();
        let categorias = await controladora.obtenerCategorias();
        this.setState({
            categorias: categorias
        });
    }

    modificarCategoria = async(idCategoria) =>{
        window.location.href='/modificarCategoria/'+idCategoria; 
    }

    eliminarCategoria = async(idCategoria) => {
        let controladora = new Controladora();
        let response = await controladora.eliminarCategoria(idCategoria);
        if(!response.data){
            window.location.href='/VerCategorias'
            await swal("Categoría eliminada", "", "success");
        } else {
            if (response.data.errno === 1217){
                swal("No se puede eliminar la categoría","", "warning");
            }else{
                swal("Error al eliminar","", "warning");
            }
        }
    }

    render(){
        return(
            <div>
                <Navbar id="#navBar" collapseOnSelect bg="secondary" variant="light" expand="lg">
                    <Container>
                        <Navbar.Brand id="navTitle" href="">Categorías</Navbar.Brand>
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
                        <Form.Group onChange= {this.handleChange}>
                            <Row xs={1} md={1} className="g-4">
                                {this.state.categorias.map(categoria => (
                                    <Card>
                                    <Card.Body>
                                        <Row>
                                        <Col>
                                        <Card.Title>{categoria.nombre}</Card.Title>
                                        </Col>
                                        <Col>
                                        </Col>
                                        <Col>
                                        <Button size="md" variant="secondary"  type="submit" onClick = {() => this.modificarCategoria(categoria.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                            </svg>
                                        </Button>{' '}
                                        <Button size="md" variant="secondary" type="submit" onClick = {() => this.eliminarCategoria(categoria.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                            </svg>
                                        </Button>{' '}
                                        <Button size="md" variant="secondary" type="submit" href="/VerSubcategorias">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                                        </svg>
                                        </Button>{' '}
                                        </Col>
                                        </Row>
                                    </Card.Body>
                                    </Card>
                                ))}
                            </Row>
                        </Form.Group>
                    </Form.Group>
                </div>
                <Navbar fixed="bottom" id="#navBarBottom" collapseOnSelect bg="" variant="light" expand="lg">
                    <Container>
                    </Container>
                        <Row>
                            <Col>
                                <Nav.Link className="botonNav2" href="/CrearCategoria">Crear Categoría</Nav.Link>{' '}
                            </Col>
                            <Col>
                                <Nav.Link className="botonNav2" href="/Galeria">Volver</Nav.Link>{' '}
                            </Col>
                        </Row>
                </Navbar>
            </div>
        )
    }
}