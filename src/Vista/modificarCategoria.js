import React, {Component} from 'react';
import {Button, Nav, Navbar, Container, Form } from "react-bootstrap";
import Cookies from "universal-cookie";
import swal from "sweetalert";
import NavStyle from "./css/NavStyle.css";
import Dropdown from '@restart/ui/esm/Dropdown';
import Controladora from '../Controladora/Controladora';

const cookies = new Cookies();

export default class modificarCategoria extends Component{

    state = {
        nombre:''
    }

    handleChange = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    componentDidMount(){
        this.obtenerCategoria();
    }

    obtenerCategoria = async(e) =>{
        let controladora = new Controladora();
        let categoria = await controladora.obtenerCategoria(this.props.match.params.id);
        document.getElementById("nombre").value = categoria.nombre;
        this.setState({
            correoUsuario: categoria.nombre,
        })
    }

    modificarCategoria = async(e) =>{

        let controladora = new Controladora();
        let response = await controladora.modificarCategoria(this.props.match.params.id,  this.state.nombre);
        if(!response.data){
            swal("Cita modificada exitosamente","" ,"success").then((value) => {
                window.location.href="/VerCategorias";
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
                        <Navbar.Brand id="navTitle" href="">Modificar Categoria</Navbar.Brand>
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
                                <h6>Datos categoria actual: </h6>
                                <br/>
                                <h6>Nombre:</h6>
                                <Form.Control id="nombre" type="text" name='nombre' />
                                <br/>
                            </Form.Group>

                        </div>
                        <div className="d-grid gap-2">
                            <Button size="md" variant="secondary" onClick = {() => this.modificarCategoria()}>
                                Modificar
                            </Button>
                            <Button size="md" variant="secondary" href="/VerCategorias">
                                Cancelar
                            </Button>
                        </div>
                    </Form.Group>
                </div >
            </div>
        )
    }
}