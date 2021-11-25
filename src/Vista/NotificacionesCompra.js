import React, {Component} from 'react';
import {Button, Nav, Navbar, Container, Form, Card, Row, Col } from "react-bootstrap";
import Cookies from "universal-cookie";
import Controladora from "../Controladora/Controladora";

const cookies = new Cookies();

export default class NotificacionesCompra extends Component{

    state = {
        notificaciones: []
    }

    componentDidMount() {
        this.obtenerNotificaciones();
    }

    obtenerNotificaciones = async() => {
        let controladora = new Controladora();
        let response = await controladora.obtenerNotificacionesCompra();
        for(let i = 0;i<response.length;i++){
            if(Number(response[i].vista) === 1){
                let orden = await controladora.obtenerOrden(response[i].idOrdenCompra);
                response[i].idOrdenCompra = orden.data[0];
                this.state.notificaciones.push(response[i]);
            }
        }
    }

    cerrarSesion = () =>{
        cookies.remove('correo',    {path: "/"});
        cookies.remove('rol',       {path: "/"});
        window.location.href="/";
    }

    /*enviar = async (e) => {
        let controladora = new Controladora();
        let usuario = null;

        if(this.state.correo !== "" && this.state.contrasena !== ""){
            usuario = await controladora.iniciarSesion(this.state.correo, this.state.contrasena);
            if(usuario !== null){
                cookies.set('correo',          usuario.correo,            {path: "/"});
                cookies.set('rol',               usuario.rol,               {path: "/"});
                swal("Usuario encontrado","" ,"success").then((value) => {
                    window.location.href="/Galeria";
                });
            }else{
                swal("Usuario incorrecto","" ,"warning");
            }
        } else {
            swal("Alguna casilla se encuentra vacía","" ,"warning");
        }
    }*/

    render(){
        return(
            <div>
                <Navbar id="#navBar" collapseOnSelect bg="secondary" variant="light" expand="lg">
                    <Container>
                        <Navbar.Brand id="navTitle">Notificaciones Compra</Navbar.Brand>
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
                <div className="center container w-70 p-8 py-2 my-3 mt-5"> 
                    <Row xs={1} md={1} className="g-4">
                        {this.state.notificaciones.map(notificacion => 
                            <Card>
                            <Card.Body>
                                <Row>
                                <Col sm={10}>
                                <Card.Title>Pedido #12</Card.Title>
                                <Card.Text>
                                {}
                                </Card.Text>
                                </Col>
                                <Col sm={1}>
                                <Button size="md" variant="secondary" type="submit">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                </svg>
                                </Button>
                                </Col>
                                <Col  sm={1}>
                                <Button size="md" variant="secondary" type="submit">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                </svg>
                                </Button>
                                </Col>
                                </Row>
                            </Card.Body>
                            </Card>
                        )}
                    </Row>
                </div >
            </div>
            
        )
    }
}