import React, {Component} from 'react';
import {Button, Nav, Navbar, Container, Card, Row, Col } from "react-bootstrap";
import Cookies from "universal-cookie";
import Controladora from "../Controladora/Controladora";
import swal from "sweetalert";

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
        let notificaciones = [];
        for(let i = 0;i<response.length;i++){
            if(Number(response[i].vista) === 1){
                let orden = await controladora.obtenerOrden(response[i].idOrdenCompra);
                response[i].idOrdenCompra = orden.data[0];
                notificaciones.push(response[i]);
            }
        }
        this.setState({
            notificaciones: notificaciones
        })
        console.log(this.state.notificaciones)
    }

    cerrarSesion = () =>{
        cookies.remove('correo',    {path: "/"});
        cookies.remove('rol',       {path: "/"});
        window.location.href="/";
    }

    eliminarNotificacion = async (type, id)=>{
        let controladora = new Controladora();
        let response = await controladora.eliminarNotificacion(type, id);
        if(!response.data){
            swal("Notificación escondida", "", "success").then((value)=>{
                window.location.href='/NotificacionesCompra'
            })
        } else {
            swal("Error al esconder","", "warning");
        }
    }

    crearEntrega = async (notificacion)=>{
        cookies.set('idOrdenCompra',          notificacion.idOrdenCompra.id,                  {path: "/"});
        cookies.set('correoUsuario',          notificacion.idOrdenCompra.correoUsuario,       {path: "/"});
        cookies.set('direccion',              notificacion.idOrdenCompra.direccion,           {path: "/"});
        cookies.set('idNotificacion',         notificacion.id,                                {path: "/"});
        window.location.href='/CrearEntrega'
    }

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
                                <Nav.Link className="botonNav" href="/Ordenes">Ver Ordenes</Nav.Link>
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
                                <Card.Title>Pedido #{notificacion.idOrdenCompra.id}</Card.Title>
                                <Card.Text>
                                Usuario: {notificacion.idOrdenCompra.correoUsuario}, Dirección: {notificacion.idOrdenCompra.direccion}
                                </Card.Text>
                                </Col>
                                <Col>
                                <Button size="lg" variant="secondary" type="submit" onClick={() => this.crearEntrega(notificacion)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                                </svg>
                                </Button>
                                </Col>
                                <Col>
                                <Button size="lg" variant="secondary" type="submit" onClick={() => this.eliminarNotificacion("NotificacionCompra", notificacion.id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                                    <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"/>
                                    <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"/>
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