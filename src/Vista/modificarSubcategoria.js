import React, {Component} from 'react';
import {Button, Nav, Navbar, Container, Form } from "react-bootstrap";
import Cookies from "universal-cookie";
import swal from "sweetalert";
import NavStyle from "./css/NavStyle.css";
import Dropdown from '@restart/ui/esm/Dropdown';
import Controladora from '../Controladora/Controladora';

const cookies = new Cookies();

export default class modificarSubcategoria extends Component{

    state = {
        nombre:''
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
        this.obtenerSubcategoria();
    }

    obtenerSubcategoria = async(e) =>{
        let controladora = new Controladora();
        let subcategoria = await controladora.obtenerSubcategoria(this.props.match.params.id);
        document.getElementById("nombre").value = subcategoria.nombre;
        this.setState({
            nombre: subcategoria.nombre,
        })
    }

    modificarSubcategoria = async(e) =>{
        if(this.state.nombre !== ""){
        let controladora = new Controladora();
        let response = await controladora.modificarSubcategoria(this.props.match.params.id,  this.state.nombre);
        if(!response.data){
            swal("Subcategoría modificada exitosamente","" ,"success").then((value) => {
                window.location.href='/VerSubCategorias/'+this.props.match.params.id;
            })
        }else{
            swal("Error en el proceso de modificación","", "warning");
        }
    } else {
        swal("Alguna casilla se encuentra vacía","" ,"warning");
    }
    }

    render(){
        return(
            <div>
                <Navbar id="#navBar" collapseOnSelect bg="secondary" variant="light" expand="lg">
                    <Container>
                        <Navbar.Brand id="navTitle" href="">Modificar Subcategoría</Navbar.Brand>
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
                                <h6>Datos de subcategoría actual: </h6>
                                <br/>
                                <h6>Nombre:</h6>
                                <Form.Control id="nombre" type="text" name='nombre' />
                                <br/>
                            </Form.Group>

                        </div>
                        <div className="d-grid gap-2">
                            <Button size="md" variant="secondary" onClick = {() => this.modificarSubcategoria()}>
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