import React, {Component} from 'react';
import {Button, Nav, Navbar, Container, Form } from "react-bootstrap";
import Cookies from "universal-cookie";
import swal from "sweetalert";
import NavStyle from "./css/NavStyle.css";
import Dropdown from '@restart/ui/esm/Dropdown';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Controladora from '../Controladora/Controladora';

const cookies = new Cookies();

export default class VerCita extends Component{

    state = {
        correoUsuario:'',
        idPublicacion:'',
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

    componentDidMount(){
        this.obtenerCita();
    }

    obtenerCita = async(e) =>{
        let controladora = new Controladora();
        let cita = await controladora.obtenerCompromiso("Cita", this.props.match.params.id);
        document.getElementById("fechaHoraInicio").value = cita.fechaHoraInicio;
        document.getElementById("fechaHoraFin").value = cita.fechaHoraFin;
        let publicacion = await controladora.obtenerPublicacion(cita.publicacion);
        console.log(publicacion);
        this.setState({
            correoUsuario: cita.usuario,
            maquillaje: publicacion.data[0].descripcion,
            fechaHoraInicio: cita.fechaHoraInicio,
            fechaHoraFin: cita.fechaHoraFin,
            lugar: cita.lugar
        })
    }

    eliminar = async(e) =>{
        let controladora = new Controladora();
        let response = await controladora.eliminarCompromiso("Cita", this.props.match.params.id);
        if(!response.data){
            swal("Cita eliminada exitosamente","" ,"success").then((value) => {
                window.location.href="/Agenda";
            })
        }else{
            swal("Error al eliminar","", "warning");
        }
    }

    modificar = async(e) =>{
        e.preventDefault();
        let controladora = new Controladora();
        let lugar = this.state.provincia+"-"+this.state.canton+"-"+this.state.distrito+"-"+this.state.direccion;
        let response = await controladora.modificarCita(this.state.fechaHoraInicio, this.state.fechaHoraFin, this.props.match.params.id, this.state.correoUsuario, lugar, this.state.idPublicacion);
        if(!response.data){
            swal("Cita modificada exitosamente","" ,"success").then((value) => {
                window.location.href="/Agenda";
            })
        }else{
            swal("Error en el proceso de modificación","", "warning");
        }
    }

    render(){
        return(
            <div>
                <Navbar fixed="top" id="#navBar" collapseOnSelect bg="secondary" variant="light" expand="lg">
                    <Container>
                        <Navbar.Brand id="navTitle" href="">Ver Cita</Navbar.Brand>
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
                        <br/>
                        <div>
                            <Form.Group onChange= {this.handleChange}>
                                <h4>Datos cita actual: </h4>
                                <h4>{this.state.maquillaje}</h4>
                                <h6>Usuario: {this.state.correoUsuario}</h6>
                                <h6>Dirección: {this.state.lugar}</h6>
                                <h6>Fecha y hora de inicio:</h6>
                                <br/>
                                <Form.Control id="fechaHoraInicio" type="datetime-local" name='fechaHoraInicio' />
                                <br/>
                                <h6>Fecha y hora de fin:</h6>
                                <Form.Control id="fechaHoraFin" type="datetime-local" name='fechaHoraFin' />
                                <br/>
                            </Form.Group>

                        </div>
                        <div className="d-grid gap-2">
                            <Row>
                                <Col>
                            <Button size="md" variant="secondary" onClick={this.modificar}>
                                Modificar
                            </Button>{' '}
                            <Button size="md" variant="secondary" onClick={this.eliminar}>
                                Eliminar
                            </Button>{' '}
                            <Button size="md" variant="secondary" href="/Agenda">
                                Cancelar
                            </Button>
                            </Col>
                            </Row>
                        </div>
                    </Form.Group>
                </div >
            </div>
        )
    }
}