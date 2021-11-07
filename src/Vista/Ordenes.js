import React, {Component} from 'react';
import {Button, Nav, Navbar, Container, Form } from "react-bootstrap";
import Cookies from "universal-cookie";
import swal from "sweetalert";
import NavStyle from "./css/NavStyle.css";
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Controladora from '../Controladora/Controladora';

const cookies = new Cookies();

export default class Ordenes extends Component{

    state = {
        ordenes: []
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

    componentDidMount(){
        this.obtenerOrdenes();
    }

    verOrden = async(idOrden) =>{
        window.location.href='/VerOrden/'+idOrden; 
    }

    obtenerOrdenes  = async (e) => {
        let controladora = new Controladora();
        let ordenes = await controladora.obtenerOrdenes();
        this.setState({
            ordenes: ordenes
        });
    }

    eliminarOrden = async (idOrden)=>{
        let controladora = new Controladora();
        let response = await controladora.eliminarNotificacion("NotificacionCompra", idOrden);
        controladora.eliminarOrden(idOrden);
        if(!response.data){
            swal("Orden eliminada", "", "success").then((value)=>{
                window.location.href='/Ordenes'
            })
        } else {
            swal("Error al eliminar","", "warning");
        }
    }

    render(){
        return(
            <div>
                <Navbar id="#navBar" collapseOnSelect bg="secondary" variant="light" expand="lg">
                    <Container>
                        <Navbar.Brand id="navTitle" href="">Ordenes</Navbar.Brand>
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
                <div className="center container w-70 p-8 py-2 my-3  mt-5"> 
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Group onChange= {this.handleChange}>
                            <Row xs={1} md={1} className="g-4">
                                {this.state.ordenes.map(orden => (
                                    <Card>
                                    <Card.Body>
                                        <Row>
                                        <Col sm={2}>
                                            <Card.Img variant="top" src={`${process.env.PUBLIC_URL}/assets/images/${orden.comprobante}`} />
                                        </Col>
                                        <Col>
                                        <Card.Title>Usuario:</Card.Title>
                                        <Card.Text>
                                            {orden.comprador}
                                        </Card.Text>
                                        </Col>
                                        <Col>
                                        <Card.Title>Dirección:</Card.Title>
                                        <Card.Text>
                                            {orden.direccion}
                                        </Card.Text>
                                        </Col>
                                        <Col>
                                        <Card.Title>ID:</Card.Title>
                                        <Card.Text>
                                            {orden.id}
                                        </Card.Text>
                                        </Col>
                                        <Col>
                                        <Button size="md" variant="secondary" type="submit" onClick = {() => this.eliminarOrden(orden.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                            </svg>
                                        </Button>{' '}
                                        <Button size="md" variant="secondary" type="submit"  onClick = {() => this.verOrden(orden.id)}>
                                            Ver
                                        </Button>
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