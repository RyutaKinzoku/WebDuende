import React, {Component} from 'react';
import {Button, Nav, Navbar, Container, Form } from "react-bootstrap";
import Cookies from "universal-cookie";
import swal from "sweetalert";
import NavStyle from "./css/NavStyle.css";
import Dropdown from '@restart/ui/esm/Dropdown';
import Controladora from "../Controladora/Controladora";

const cookies = new Cookies();

export default class CrearPublicacion extends Component{

    state = {
        imagen: null,
        descripcion:'',
        tags:'',
        categoria:'',
        subcategoria:'',
    }

    handleChange = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
        if (e.target.files) {
            let imagen = e.target.files;
            this.setState({imagen: imagen}, () => { console.log(this.state.imagen[0]) })
        } else {
            console.log("Selecione un archivo")
        }
    }

    agregarPublicacion  = async (e) => {
        e.preventDefault();
        let controladora = new Controladora();
        try{ //imagen, descripcion, tags, idCategoria, idSubcategoria = null
            console.log(this.state);
            await controladora.agregarPublicacion(
                this.state.imagen,
                this.state.descripcion,
                this.state.tags,
                1,
                1
                /*
                this.state.categoria,
                this.state.subcategoria,
                */
            );
            swal("Publicación agregada","","success");
            //window.location.href="/galeria";
        }catch(err){
            swal("Error al agregar","", "warning");
        }
    }

    render(){
        return(
            <div>
                <Navbar id="#navBar" collapseOnSelect bg="secondary" variant="light" expand="lg">
                    <Container>
                        <Navbar.Brand id="navTitle" href="">Crear Publicacion</Navbar.Brand>
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
                                <h6>Imagen:</h6>
                                <Form.Control type="file" name='imagen' />
                                <br/>
                                <h6>Descripcion:</h6>
                                <Form.Control type="text" name = 'descripcion' />
                                <br/>
                                <h6>Tags:</h6>
                                <Form.Control type="text" name = 'tags' />
                                <br/>
                                <h6>Categoría:</h6>
                                <br/>
                                <h6>Subcategoría:</h6>
                                <br/>
                            </Form.Group>

                        </div>
                        <div className="d-grid gap-2">
                            <Button size="md" variant="secondary" type="submit" onClick={this.agregarPublicacion}>
                                Publicar
                            </Button>
                            <Button size="md" variant="secondary" type="submit" href = "/galeria">
                                Cancelar
                            </Button>
                        </div>
                    </Form.Group>
                </div >
            </div>
        )
    }
}