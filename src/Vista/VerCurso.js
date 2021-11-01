import React, {Component} from 'react';
import {Button, Nav, Navbar, Container, Form } from "react-bootstrap";
import Cookies from "universal-cookie";
import swal from "sweetalert";
import NavStyle from "./css/NavStyle.css";
import Dropdown from '@restart/ui/esm/Dropdown';
import Controladora from '../Controladora/Controladora';

const cookies = new Cookies();

export default class VerCurso extends Component{

    state = {
        titulo:'',
        fechaHoraInicio:'',
        fechaHoraFin:'',
        provincia:'',
        canton:'',
        distrito:'',
        direccion:''
    }

    handleChange = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    componentDidMount(){
        this.obtenerCurso();
    }

    obtenerCurso = async(e) =>{
        let controladora = new Controladora();
        let curso = await controladora.obtenerCompromiso("Curso", this.props.match.params.id);
        let lugar = curso.lugar.split('-');
        document.getElementById("titulo").value = curso.titulo;
        document.getElementById("fechaHoraInicio").value = curso.fechaHoraInicio;
        document.getElementById("fechaHoraFin").value = curso.fechaHoraFin;
        document.getElementById("provincia").value = lugar[0];
        document.getElementById("canton").value = lugar[1];
        document.getElementById("distrito").value = lugar[2];
        document.getElementById("direccion").value = lugar[3];
        this.setState({
            titulo: curso.titulo,
            fechaHoraInicio: curso.fechaHoraInicio,
            fechaHoraFin: curso.fechaHoraFin,
            provincia: lugar[0],
            canton: lugar[1],
            distrito: lugar[2],
            direccion: lugar[3]
        })
    }

    eliminar = async(e) =>{
        let controladora = new Controladora();
        let response = await controladora.eliminarCompromiso("Curso", this.props.match.params.id);
        if(!response.data){
            swal("Curso eliminado exitosamente","" ,"success").then((value) => {
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
        let response = await controladora.modificarCurso(this.state.fechaHoraInicio, this.state.fechaHoraFin, this.state.titulo, this.props.match.params.id, lugar);
        if(!response.data){
            swal("Curso modificado exitosamente","" ,"success").then((value) => {
                window.location.href="/Agenda";
            })
        }else{
            swal("Error en el proceso de modificación","", "warning");
        }
    }

    render(){
        return(
            <div>
                <Navbar id="#navBar" collapseOnSelect bg="secondary" variant="light" expand="lg">
                    <Container>
                        <Navbar.Brand id="navTitle" href="">Ver Curso</Navbar.Brand>
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
                        <div>
                            <Form.Group onChange= {this.handleChange}>
                                <h6>Datos curso actual: </h6>
                                <br/>
                                <h6>Titulo:</h6>
                                <Form.Control id="titulo" type="text" name='titulo' />
                                <br/>
                                <h6>Fecha y hora de inicio:</h6>
                                <Form.Control id="fechaHoraInicio" type="datetime-local" name='fechaHoraInicio' />
                                <br/>
                                <h6>Fecha y hora de fin:</h6>
                                <Form.Control id="fechaHoraFin" type="datetime-local" name='fechaHoraFin' />
                                <br/>
                                <h6>Provincia:</h6>
                                <Form.Control id="provincia" type="text" name='provincia' />
                                <br/>
                                <h6>Cantón:</h6>
                                <Form.Control id="canton" type="text" name='canton' />
                                <br/>
                                <h6>Distrito:</h6>
                                <Form.Control id="distrito" type="text" name='distrito' />
                                <br/>
                                <h6>Dirección:</h6>
                                <Form.Control id="direccion" type="text" name='direccion' />
                                <br/>
                            </Form.Group>

                        </div>
                        <div className="d-grid gap-2">
                            <Button size="md" variant="secondary" onClick={this.modificar}>
                                Modificar
                            </Button>
                            <Button size="md" variant="secondary" onClick={this.eliminar}>
                                Eliminar
                            </Button>
                            <Button size="md" variant="secondary" href="/Agenda">
                                Cancelar
                            </Button>
                        </div>
                    </Form.Group>
                </div >
            </div>
        )
    }
}