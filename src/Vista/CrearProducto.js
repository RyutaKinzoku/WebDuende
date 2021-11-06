import React, {Component} from 'react';
import {Button, Nav, Navbar, Container, Form } from "react-bootstrap";
import Cookies from "universal-cookie";
import swal from "sweetalert";
import NavStyle from "./css/NavStyle.css";
import Dropdown from '@restart/ui/esm/Dropdown';
import Controladora from "../Controladora/Controladora";

const cookies = new Cookies();

export default class CrearProducto extends Component{

    state = {
        nombre:'',
        descripcion:'',
        precio:'',
        cantidad: '',
        imagen: null,
    }

    handleChange = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
        if (e.target.files) {
            let imagen = e.target.files;
            this.setState({imagen: imagen}, () => { console.log(this.state.imagen[0]) })
        } else {
            console.log("Selecione un archivo")
        }
    }

    crearProducto  = async (e) => {
        e.preventDefault();
        let controladora = new Controladora();
        try{
            await controladora.agregarProducto(
                this.state.nombre, 
                this.state.descripcion, 
                this.state.precio, 
                this.state.cantidad, 
                this.state.imagen
            );
            swal("Producto agregado","","success").then((value)=>{
                window.location.href="/Tienda";
            });
        }catch(err){
            swal("Error al agregar","", "warning");
        }
    }

    render(){
        return(
            <div>
                <Navbar id="#navBar" collapseOnSelect bg="secondary" variant="light" expand="lg">
                    <Container>
                        <Navbar.Brand id="navTitle" href="">Crear Producto</Navbar.Brand>
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
                                <h6>Por favor, ingrese los siguientes datos: </h6>
                                <br/>
                                <h6>Nombre:</h6>
                                <Form.Control type="text" name='nombre' />
                                <br/>
                                <h6>Descripcion:</h6>
                                <Form.Control type="text" name = 'descripcion' />
                                <br/>
                                <h6>Precio:</h6>
                                <Form.Control type="text" name = 'precio' />
                                <br/>
                                <h6>Cantidad:</h6>
                                <Form.Control type="text" name = 'cantidad' />
                                <br/>
                                <h6>Imagen:</h6>
                                <Form.Control type="file" name='imagen' />
                                <br/>
                            </Form.Group>

                        </div>
                        <div className="d-grid gap-2">
                            <Button size="md" variant="secondary" type="submit" onClick={this.crearProducto}>
                                Publicar
                            </Button>
                            <Button size="md" variant="secondary" type="submit" href = "/Tienda">
                                Cancelar
                            </Button>
                        </div>
                    </Form.Group>
                </div >
            </div>
        )
    }
}