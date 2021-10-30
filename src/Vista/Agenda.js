import React, {Component} from 'react';
import {Button, Nav, Navbar, Container, Form, NavDropdown} from "react-bootstrap";
import Cookies from "universal-cookie";
import FullCalendar, { formatDate } from '@fullcalendar/react';
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from '@fullcalendar/timegrid';
import Controladora from "../Controladora/Controladora";
const cookies = new Cookies();

export default class Agenda extends Component{
    handleChange = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    componentDidMount() {
        this.obtenerProductos();    
    }

    obtenerProductos = async() => {
        let controladora = new Controladora();
        let productos = await controladora.obtenerProductos();
        this.setState({
            productos: productos
        })
    }

    render(){
        return(
            <div>
                <Navbar id="#navBar" collapseOnSelect bg="secondary" variant="light" expand="lg">
                    <Container>
                        <Navbar.Brand id="navTitle" href="">Agenda de Duende</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link className="botonNav" href="">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell-fill" viewBox="0 0 16 16">
                                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>
                                </svg>
                                </Nav.Link>
                                <Nav.Link className="botonNav" href="/Tienda">Tienda</Nav.Link>
                                <Nav.Link className="botonNav" href="/Galeria">Galería</Nav.Link>
                            </Nav>
                            <Nav>
                                <Nav.Link className="botonNav" href="">Ver Ordenes</Nav.Link>
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
                                events={[
                                    {
                                        allDay: false,
                                        id: 1,
                                        title: 'The Title', // a property!
                                        start: '2021-10-28T10:00', // a property!
                                        end: '2021-10-28T12:00', // a property! ** see important note below about 'end' **
                                        color: '#FFAF77'
                                    }
                                ]}
                            />
                        </div>
                    </Form.Group>
                </div >
            </div>
        )
    }
}