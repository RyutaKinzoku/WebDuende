import React, {Component} from 'react';
import {Button, Nav, Navbar, Container, Form } from "react-bootstrap";
import Cookies from "universal-cookie";
import swal from "sweetalert";
import NavStyle from "./css/NavStyle.css";
import Dropdown from '@restart/ui/esm/Dropdown';
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Controladora from "../Controladora/Controladora"

const cookies = new Cookies();

export default class ModificarProducto extends Component{

    state = {
        nombre:'',
        descripcion:'',
        precio:'',
        cantidad: '',
        imagen: null,
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
        });
        if (e.target.files) {
            let imagen = e.target.files;
            this.setState({imagen: imagen}, () => { console.log(this.state.imagen[0]) })
        }
    }

    obtenerProducto = async(idProducto) =>{
        let controladora = new Controladora();
        let producto = (await controladora.obtenerProducto(idProducto)).data[0];
        this.setState({
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            precio: producto.precio,
            cantidad: producto.cantidad,
            imagen:producto.imagen,
        })
    }

    componentDidMount() {
        this.obtenerProducto(this.props.match.params.id);    
    }

    modificarProducto  = async (e) => {
        e.preventDefault();
        let controladora = new Controladora();
        try{
            await controladora.modificarProducto(
                this.props.match.params.id,
                this.state.nombre, 
                this.state.descripcion, 
                this.state.precio, 
                this.state.cantidad, 
                this.state.imagen
            );
            swal("Producto modificado","","success");
            window.location.href="/Tienda";
        } catch (err){
            swal("Error al modificar","", "warning");
        }
    }

    render(){
        return(
            <div>
                <Navbar id="#navBar" collapseOnSelect bg="secondary" variant="light" expand="lg">
                    <Container>
                        <Navbar.Brand id="navTitle" href="">Modificar Producto</Navbar.Brand>
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
                <div className="center container w-55 p-8 py-2 my-3  mt-5">
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <div>
                                    <Form.Group onChange= {this.handleChange}>
                                        <h6>Por favor, modificar los datos deseados: </h6>
                                        <br/>
                                        <h6>Nombre:</h6>
                                        <Form.Control type="text" name='nombre' defaultValue={this.state.nombre}/>
                                        <br/>
                                        <h6>Descripcion:</h6>
                                        <Form.Control type="text" name = 'descripcion' defaultValue={this.state.descripcion}/>
                                        <br/>
                                        <h6>Precio:</h6>
                                        <Form.Control type="text" name = 'precio' defaultValue={this.state.precio}/>
                                        <br/>
                                        <h6>Cantidad:</h6>
                                        <Form.Control type="text" name = 'cantidad' defaultValue={this.state.cantidad}/>
                                        <br/>
                                        <h6>Imagen:</h6>
                                        <Form.Control type="file" name='imagen'defaultValue={this.state.imagen}/>
                                        <br/>
                                    </Form.Group>
                                </div>
                                <div className="d-grid gap-2">
                                    <Button size="md" variant="secondary" type="submit" onClick={this.modificarProducto}>
                                        Modificar
                                    </Button>
                                    <Button size="md" variant="secondary" type="submit" href = "/Tienda">
                                        Cancelar
                                    </Button>
                                </div>
                            </Form.Group>
                        </Col>
                        <Col>
                            <div className="center container w-55 p-8 py-2 my-3  mt-5">
                                <Image src={`${process.env.PUBLIC_URL}/assets/images/${this.state.imagen}`} rounded />
                            </div>
                        </Col>
                    </Row>
                </div >
            </div>
        )
    }
}