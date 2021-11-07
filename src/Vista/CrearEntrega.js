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
        correoUsuario:'',
        idOrdenCompra:'',
        fechaHoraInicio:'',
        fechaHoraFin:'',
        provincia:'',
        canton:'',
        distrito:'',
        direccion:''
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
        if(this.state.correoUsuario !== "" && this.state.idOrdenCompra !== "" && this.state.fechaHoraInicio !== "" && this.state.fechaHoraFin !== "" && this.state.provincia !== "" && this.state.distrito !== "" && this.state.canton !== "" && this.state.direccion !== ""){
        e.preventDefault();
        let controladora = new Controladora();
        let lugar = this.state.provincia+"-"+this.state.canton+"-"+this.state.distrito+"-"+this.state.direccion;
        let response = await controladora.agregarEntrega(this.state.fechaHoraInicio, this.state.fechaHoraFin, this.state.correoUsuario, lugar, this.state.idOrdenCompra);
        if(!response.data){
            swal("Entrega creada exitosamente","" ,"success").then((value) => {
                window.location.href="/Agenda";
            })
        }else{
            if(response.data.errno === 1366){
                swal("El número de orden debe ser un entero","", "warning");
            } else if(response.data.errno === 1216){
                swal("El correo del usuario no existe en el sistema","", "warning");
            }
            console.log(response);
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
                                <h6>Por favor, ingrese los siguientes datos: </h6>
                                <br/>
                                <h6>Número de orden:</h6>
                                <Form.Control type="text" name='idOrdenCompra' />
                                <br/>
                                <h6>Correo usuario:</h6>
                                <Form.Control type="text" name='correoUsuario' />
                                <br/>
                                <h6>Fecha y hora de inicio:</h6>
                                <Form.Control type="datetime-local" name='fechaHoraInicio' />
                                <br/>
                                <h6>Fecha y hora de fin:</h6>
                                <Form.Control type="datetime-local" name='fechaHoraFin' />
                                <br/>
                                <h6>Provincia:</h6>
                                <Form.Control type="text" name='provincia' />
                                <br/>
                                <h6>Cantón:</h6>
                                <Form.Control type="text" name='canton' />
                                <br/>
                                <h6>Distrito:</h6>
                                <Form.Control type="text" name='distrito' />
                                <br/>
                                <h6>Dirección:</h6>
                                <Form.Control type="text" name='direccion' />
                                <br/>
                            </Form.Group>

                        </div>
                        <div className="d-grid gap-2">
                            <Button size="md" variant="secondary" onClick={this.crear}>
                                Continuar
                            </Button>
                            <Button size="md" variant="secondary" href="/Compromisos">
                                Cancelar
                            </Button>
                        </div>
                    </Form.Group>
                </div >
            </div>
        )
    }
}