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

    eliminarNotificacion = async (type, id)=>{
        let controladora = new Controladora();
        let response = await controladora.eliminarNotificacion(type, id);
        if(!response.data){
            swal("Notificación escondida", "", "success").then((value)=>{
                window.location.href='/Agenda'
            })
        } else {
            swal("Error al esconder","", "warning");
        }
    }

    obtenerNotificaciones = async() => {
        let controladora = new Controladora();
        let response = await controladora.obtenerNotificaciones();
        response.forEach(notificacion => {
            if(Number(notificacion.vista) === 1){
                if(notificacion.type() === "NotificacionCita"){
                    this.state.notificaciones.push(notificacion);
                }
                if(notificacion.type() === "NotificacionCompra"){
                    this.state.notificaciones.push(notificacion);
                }
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
                               {Number(notificacion.vista) === 1 ?
                           <Card.Body>
                               <Row>
                               <Card.Text>
                                {notificacion.idOrdenCompra !== undefined ? "Nueva compra, pedido #"+notificacion.idOrdenCompra :<div></div>}
                                {notificacion.correoUsuario !== undefined ? "Nuevo comentario de "+notificacion.correoUsuario+" en la publicacion #"+notificacion.idPublicacion :<div></div>}
                                {notificacion.correoUsuario !== undefined ? <br/> :<div></div>}
                                {notificacion.correoUsuario !== undefined ? "Lugar: "+notificacion.lugar :<div></div>}
                                {notificacion.correoUsuario !== undefined ? <br/> :<div></div>}
                                {notificacion.correoUsuario !== undefined ? "Mensaje: "+notificacion.mensaje :<div></div>}
                               </Card.Text>
                               {notificacion.correoUsuario !== undefined ?
                               <Button size="md" variant="secondary" type="submit" onClick = {() => this.eliminarNotificacion("NotificacionCita",notificacion.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                                    <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"/>
                                    <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"/>
                                    </svg>
                                </Button>:<div></div>}
                                {notificacion.idOrdenCompra !== undefined ?
                               <Button size="md" variant="secondary" type="submit" onClick = {() => this.eliminarNotificacion("NotificacionCompra",notificacion.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                                    <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"/>
                                    <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"/>
                                    </svg>
                                </Button>:<div></div>}
                                </Row>
                           </Card.Body>:<div></div>}
                           </Card>
                        )}
                    </Offcanvas.Body>
                    </Offcanvas>
                </>
                <Navbar fixed="top" id="#navBar" collapseOnSelect bg="secondary" variant="light" expand="lg">
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
                                {cookies.get('correo') !== undefined? 
                                <Nav.Link className="botonNav" onClick={()=>this.cerrarSesion()}>Cerrar Sesión</Nav.Link>:
                                <div></div>}
                                {cookies.get('correo') === undefined? 
                                <Nav.Link className="botonNav" href="/">Iniciar Sesión</Nav.Link>:
                                <div></div>}
                                {cookies.get('correo') === undefined? 
                                <Nav.Link className="botonNav" href="/Registrarse">Registrarse</Nav.Link>:
                                <div></div>}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <div>
                
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <br/>
                        <br/>
                        <br/>
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