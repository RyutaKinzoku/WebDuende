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

export default class Comentar extends Component{

    state = {
        mensaje: '',
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

    comentar = async()=>{
        console.log(this.state.mensaje)
        if(this.state.mensaje !== "" && this.state.provincia !== "" && this.state.canton !== "" && this.state.distrito !== "" && this.state.direccion !== ""){
        let controladora = new Controladora();
        try{
            let lugar = this.state.provincia+"-"+this.state.canton+"-"+this.state.distrito+"-"+this.state.direccion;
            let response = await controladora.agregarNotificacionCita(this.props.match.params.id, cookies.get('correo'), this.state.mensaje, lugar);
            if (response.data.errno === 1406){
                swal("El comentario es muy largo","", "warning");
            }else{
                window.location.href='/galeria';
            }
        } catch (err){
            swal("Error al comentar","", "warning");
        }
        } else {
            swal("La casilla de comentario se encuentra vacía","" ,"warning");
        }
    }

    render(){
        return(
            <div>
                <Navbar fixed="top" id="#navBar" collapseOnSelect bg="secondary" variant="light" expand="lg">
                    <Container>
                        <Navbar.Brand id="navTitle" href="">Comentar</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
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
                            <h6>Comentario: </h6>
                            <Form.Control as="textarea" rows={3} name="mensaje"/>
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
                        <Row>
                            <Col>
                            <Button size="md" variant="secondary" onClick={this.comentar}>
                                Modificar
                            </Button>{' '}
                            <Button size="md" variant="secondary" href="/Galeria">
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