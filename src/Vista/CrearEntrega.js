import React, {Component} from 'react';
import {Button, Nav, Navbar, Container, Form } from "react-bootstrap";
import Cookies from "universal-cookie";
import swal from "sweetalert";
import NavStyle from "./css/NavStyle.css";
import Dropdown from '@restart/ui/esm/Dropdown';
import Controladora from '../Controladora/Controladora';

const cookies = new Cookies();

export default class CrearEntrega extends Component{

    state = {
        fechaHoraInicio:'',
        fechaHoraFin:'',
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

    crear  = async (e) => {
        if(this.state.fechaHoraInicio !== "" && this.state.fechaHoraFin !== ""){
            e.preventDefault();
            let controladora = new Controladora();
            let response = await controladora.agregarEntrega(this.state.fechaHoraInicio, this.state.fechaHoraFin, cookies.get("correoUsuario"), cookies.get("direccion"), cookies.get("idOrdenCompra"));
            if(!response.data){
                let response2 = await controladora.eliminarNotificacion("NotificacionCompra", cookies.get("idNotificacion"));
                if(!response2.data){
                    cookies.remove('idOrdenCompra',     {path: "/"});
                    cookies.remove('idNotificacion',    {path: "/"});
                    cookies.remove('correoUsuario',     {path: "/"});
                    cookies.remove('direccion',         {path: "/"});
                    swal("Entrega creada exitosamente","" ,"success").then((value) => {
                        window.location.href="/Agenda";
                    })
                } else {
                    swal("Error al crear una entrega nueva","", "warning");
                }
            }else{
                swal("Error al crear una entrega nueva","", "warning");
            }
        }else{
            swal("Alguna casilla se encuentra vacía","" ,"warning");
        }
    }

    render(){
        return(
            <div>
                <Navbar id="#navBar" collapseOnSelect bg="secondary" variant="light" expand="lg">
                    <Container>
                        <Navbar.Brand id="navTitle">Crear Entrega</Navbar.Brand>
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
                <div className="center container w-50 p-8 py-2 my-3  mt-5">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <div>
                            <Form.Group onChange= {this.handleChange}>
                                <h4>Orden #{cookies.get("idOrdenCompra")}</h4>
                                <h6>Correo usuario: {cookies.get("correoUsuario")}</h6>
                                <h6>Dirrección: {cookies.get("direccion")}</h6>
                                <br/>
                                <h6>Por favor, ingrese los siguientes datos: </h6>
                                <br/>
                                <h6>Fecha y hora de inicio:</h6>
                                <Form.Control type="datetime-local" name='fechaHoraInicio' />
                                <br/>
                                <h6>Fecha y hora de fin:</h6>
                                <Form.Control type="datetime-local" name='fechaHoraFin' />
                                <br/>
                            </Form.Group>

                        </div>
                        <div className="d-grid gap-2">
                            <Button size="md" variant="secondary" onClick={this.crear}>
                                Continuar
                            </Button>
                            <Button size="md" variant="secondary" href="/NotificacionesCompra">
                                Cancelar
                            </Button>
                        </div>
                    </Form.Group>
                </div >
            </div>
        )
    }
}