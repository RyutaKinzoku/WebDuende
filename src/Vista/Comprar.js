import React, {Component} from 'react';
import {Button, Nav, Navbar, Container, Form } from "react-bootstrap";
import Cookies from "universal-cookie";
import swal from "sweetalert";
import NavStyle from "./css/NavStyle.css";
import Controladora from '../Controladora/Controladora';

const cookies = new Cookies();

export default class Comprar extends Component{

    state = {
        provincia:'',
        canton:'',
        distrito:'',
        direccion:'',
        comprobante: null,
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
            let comprobante = e.target.files;
            this.setState({comprobante: comprobante}, () => { console.log(this.state.comprobante[0]) })
        } else {
            console.log("Selecione un archivo")
        }
    } 

    comprar = async(e) => {
        e.preventDefault();
        if(this.state.provincia !== "" && this.state.canton !== "" && this.state.distrito !== "" && this.state.direccion && this.state.comprobante !== null){
        let controladora = new Controladora();
        let correo = cookies.get('correo');
        let direccionCompleta = this.state.provincia+'-'+this.state.canton+'-'+this.state.distrito+'-'+this.state.direccion;
        try{
            let idOrden = await controladora.comprar(correo, this.state.comprobante, direccionCompleta);
            if (idOrden >  0){
                await controladora.agregarNotificacionCompra(idOrden);
                await controladora.eliminarCarrito(correo);
                swal("Compra existosa","","success").then((value)=>{
                    window.location.href="/Carrito";
                })
            }
        }catch(err){
            swal("Error al comprar","", "warning");
        }
        } else {
            swal("Alguna casilla se encuentra vacía","" ,"warning");
        }
    }

    enviar  = async (e) => {}

    render(){
        return(
            <div>
                <Navbar id="#navBar" collapseOnSelect bg="secondary" variant="light" expand="lg">
                    <Container>
                        <Navbar.Brand id="navTitle" href="">Comprar</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link className="botonNav" href="/Tienda">Tienda</Nav.Link>
                                <Nav.Link className="botonNav" href="/Galeria">Galería</Nav.Link>
                                {cookies.get('rol') === "ADMIN" && cookies.get('correo') !== undefined ?<Nav.Link className="botonNav" href="/Agenda">Agenda</Nav.Link>:<div></div>}
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
                                <h6>Provincia:</h6>
                                <Form.Control type="text" name = 'provincia' />
                                <br/>
                                <h6>Cantón:</h6>
                                <Form.Control type="text" name = 'canton' />
                                <br/>
                                <h6>Distrito:</h6>
                                <Form.Control type="text" name = 'distrito' />
                                <br/>
                                <h6>Dirección:</h6>
                                <Form.Control type="text" name = 'direccion' />
                                <br/>
                                <h6>Comprobante:</h6>
                                <Form.Control type="file" name='comprobante' />
                                <br/>
                            </Form.Group>

                        </div>
                        <div className="d-grid gap-2">
                            <Button size="md" variant="secondary" type="submit" onClick={this.comprar}>
                                Comprar
                            </Button>
                            <Button size="md" variant="secondary" type="submit" href = "/Carrito">
                                Cancelar
                            </Button>
                        </div>
                    </Form.Group>
                </div >
            </div>
        )
    }
}