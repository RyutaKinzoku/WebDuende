import React, {Component} from 'react';
import {Button, Nav, Navbar, Container, Form, Offcanvas, Card, Row, Col} from "react-bootstrap";
import Cookies from "universal-cookie";
import FullCalendar, { formatDate } from '@fullcalendar/react';
import timeGridPlugin, { TimeColsSlatsCoords } from '@fullcalendar/timegrid';
import Controladora from "../Controladora/Controladora";
import swal from "sweetalert";
const cookies = new Cookies();

export default class Agenda extends Component{
    
    state = {
        compromisos: [],
        eventos: [],
        notificaciones: [],
        show: false
    }
    
    handleChange = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    componentDidMount() {
        this.obtenerCompromisos();
        this.obtenerNotificaciones();
    }

    obtenerCompromisos = async() => {
        let controladora = new Controladora();
        let compromisos = await controladora.obtenerCompromisos();
        this.setState({
            compromisos: compromisos
        });
        let eventos = [];
        this.state.compromisos.forEach(element => {
            if(element.type() == "Curso"){
                eventos.push({
                    allDay: false,
                    id: parseInt(element.id),
                    groupId: 1,
                    title: 'Curso: '+element.titulo,
                    start: element.fechaHoraInicio,
                    end: element.fechaHoraFin,
                    color: '#252525'
                });
            };
            if(element.type() == "Cita"){
                eventos.push({
                    allDay: false,
                    id: parseInt(element.id),
                    groupId: 2,
                    title: 'Cita con el usuario '+element.usuario+ ' para el maquillaje '+element.publicacion,
                    start: element.fechaHoraInicio,
                    end: element.fechaHoraFin,
                    color: '#F359D1'
                });
            };
            if(element.type() == "Entrega"){
                eventos.push({
                    allDay: false,
                    id: parseInt(element.id),
                    groupId: 3,
                    title: 'Entrega de la orden número '+element.orden+ ' para el usuario '+element.usuario,
                    start: element.fechaHoraInicio,
                    end: element.fechaHoraFin,
                    color: '#81C769'
                });
            };
        });
        this.setState({
            eventos: eventos
        });
    }

    eliminarNotificacion = async (idOrden)=>{
        /*let controladora = new Controladora();
        let response = await controladora.eliminarNotificacion("NotificacionCompra", idOrden);
        if(!response.data){
            swal("Notificación eliminada", "", "success").then((value)=>{
                window.location.href='/Agenda'
            })
        } else {
            swal("Error al eliminar","", "warning");
        }*/
    }

    obtenerNotificaciones = async() => {
        let controladora = new Controladora();
        let response = await controladora.obtenerNotificaciones();
        response.forEach(notificacion => {
            if(notificacion.type() === "NotificacionCita"){
                this.state.notificaciones.push(notificacion.mensaje + notificacion.idPublicacion+ "\r\n");
            }
            if(notificacion.type() === "NotificacionCompra"){
                this.state.notificaciones.push("Se ha realizado una nueva compra, pedido #"+notificacion.idOrdenCompra+"\r\n");
            }
        });
    }

    handleClose = () => this.setState({show: false});
    handleShow = () => this.setState({show: true});

    render(){
        return(
            <div>
                <>
                    <Offcanvas show={this.state.show} onHide={this.handleClose}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Notificaciones</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        {this.state.notificaciones.map(notificacion => 
                           <Card>
                           <Card.Body>
                               <Row>
                               {notificacion}
                               <Button size="md" variant="secondary" type="submit" onClick = {() => this.eliminarNotificacion(notificacion.split("#")[1])}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                    </svg>
                                </Button>
                                </Row>
                           </Card.Body>
                           </Card>
                        )}
                    </Offcanvas.Body>
                    </Offcanvas>
                </>
                <Navbar id="#navBar" collapseOnSelect bg="secondary" variant="light" expand="lg">
                    <Container>
                        <Navbar.Brand id="navTitle" href="">Agenda de Duende</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link className="botonNav" onClick={this.handleShow}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell-fill" viewBox="0 0 16 16">
                                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>
                                </svg>
                                </Nav.Link>
                                <Nav.Link className="botonNav" href="/Tienda">Tienda</Nav.Link>
                                <Nav.Link className="botonNav" href="/Galeria">Galería</Nav.Link>
                            </Nav>
                            <Nav>
                                <Nav.Link className="botonNav" href="/Ordenes">Ver Ordenes</Nav.Link>
                                <Nav.Link className="botonNav" href="/Compromisos">Crear</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <div>
                    <br/>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <div className="App">
                            <FullCalendar
                                plugins={[timeGridPlugin]}
                                headerToolbar={{
                                    left: 'prev,next today',
                                    center: 'title',
                                    right: 'timeGridWeek'
                                }}
                                defaultView="timeGridPlugin"
                                events={this.state.eventos}
                                eventClick={function(info) {
                                    if(info.event.groupId === "1"){
                                        window.location.href="/VerCurso/"+info.event.id;
                                    }
                                    else if(info.event.groupId === "2"){
                                        window.location.href="/VerCita/"+info.event.id;
                                    }
                                    else if(info.event.groupId === "3"){
                                        window.location.href="/VerEntrega/"+info.event.id;
                                    }
                                }}
                            />
                        </div>
                    </Form.Group>
                </div >
            </div>
        )
    }
}