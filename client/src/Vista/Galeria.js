import React, {Component} from 'react';
import {Button, Nav, Navbar, Container, Form, NavDropdown} from "react-bootstrap";
import Cookies from "universal-cookie";
import swal from "sweetalert";
import NavStyle from "./css/NavStyle.css";
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Controladora from "../Controladora/Controladora"
import Publicacion from "../modelo/Publicacion";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const cookies = new Cookies();

export default class Galeria extends Component{

    state = {
        publicaciones: [],
        categoria:'',
        categorias: [],
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

    componentDidMount() {
        this.obtenerPublicaciones();
        this.obtenerCategorias();
    }

    obtenerCategorias = async() => {
        let controladora = new Controladora();
        let categoriasBD = await controladora.obtenerCategorias();
        var nombresCategorias = [];
        categoriasBD.forEach(c =>
            nombresCategorias.push({nombre: c.nombre, id: c.id})
        )
        this.setState({
            categorias: nombresCategorias
        })
    }

    obtenerPublicaciones = async(idCategoria = null) => {
        let controladora = new Controladora();
        let publicaciones = await controladora.obtenerPublicaciones(idCategoria);
        this.setState({
            publicaciones: publicaciones
        })
    }

    setCategoria = async() => {
        let cat = this.state.categorias.find(c => c.nombre === document.getElementById('combo-box-categoria').value)
        if(cat !== undefined){
            this.setState({
                categoria: cat.id
            })
            this.obtenerPublicaciones(cat.id)
        } else {
            this.obtenerPublicaciones()
        }
    }

    modificarPublicacion = async(idPublicacion) => {
        window.location.href = `/modificarPublicacion/${idPublicacion}`
    }

    eliminarPublicacion = async(idPublicacion) => {
        let controladora = new Controladora();
        try{
            await controladora.eliminarPublicacion(idPublicacion).then(value => swal("Publicacion eliminada", "", "success"));
            window.location.href='/galeria';
        } catch (err){
            swal("Error al eliminar","", "warning");
        }
    }

    render(){
        return(
            <div>
                <Navbar fixed="top" id="#navBar" collapseOnSelect bg="secondary" variant="light" expand="lg">
                    <Container>
                        <Navbar.Brand id="navTitle" href="">Galer??a de Duende</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                {cookies.get('rol') === "COMUN" && cookies.get('correo') !== undefined ? <Nav.Link className="botonNav" href="/Carrito">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                                    </svg>
                                </Nav.Link>: <div></div>}
                                <Nav.Link className="botonNav" href="/Tienda">Tienda</Nav.Link>
                                {cookies.get('rol') === "ADMIN" && cookies.get('correo') !== undefined ? <Nav.Link className="botonNav" href="/Agenda">Agenda</Nav.Link>: <div></div>}
                                {cookies.get('rol') === "ADMIN" && cookies.get('correo') !== undefined ? <Nav.Link className="botonNav" href="/VerCategorias">Ver Categor??as</Nav.Link>: <div></div>}
                                {cookies.get('rol') === "ADMIN" && cookies.get('correo') !== undefined ? <Nav.Link className="botonNav" href="/CrearPublicacion">Crear Publicaci??n</Nav.Link>: <div></div>}
                            </Nav>
                            <Nav>
                                <Autocomplete
                                  disablePortal
                                  id="combo-box-categoria"
                                  options={this.state.categorias}
                                  sx={{ width: 300 }}
                                  nombre = 'categoria'
                                  getOptionLabel={(option) => option.nombre}
                                  className="botonNav"
                                  renderInput={(params) => <TextField {...params} label="Categoria" style={{ backgroundColor: "rgb(255, 255, 255)", outlineColor: "none" }} />}
                                />
                            </Nav>
                            <Nav className="me-auto">
                                <Nav.Link className="botonNav" onClick={()=>this.setCategoria()}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                </svg>
                                </Nav.Link>
                                {cookies.get('correo') !== undefined? 
                                <Nav.Link className="botonNav" onClick={()=>this.cerrarSesion()}>Cerrar Sesi??n</Nav.Link>:
                                <div></div>}
                                {cookies.get('correo') === undefined? 
                                <Nav.Link className="botonNav" href="/">Iniciar Sesi??n</Nav.Link>:
                                <div></div>}
                                {cookies.get('correo') === undefined? 
                                <Nav.Link className="botonNav" href="/Registrarse">Registrarse</Nav.Link>:
                                <div></div>}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <div>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                        <Form.Group onChange= {this.handleChange}>
                            <Row xs={1} md={3} className="g-4">
                                {this.state.publicaciones.map((publicacion) => (
                                    <Col>
                                        <Card>
                                            <Card.Img variant="top" src={`https://webduende.s3.amazonaws.com/${publicacion.imagen}`} />
                                            <Card.Body>
                                            <Card.Title>{publicacion.descripcion}</Card.Title>
                                            <Card.Text>
                                                Tags: {publicacion.tags + " "}
                                            </Card.Text>
                                            <Card.Text>
                                                Categor??a: {publicacion.categoria}
                                            </Card.Text>
                                            <Card.Text>
                                                Subcategor??a: {publicacion.subcategoria}
                                            </Card.Text>
                                            {cookies.get('rol') !== "ADMIN" && cookies.get('correo') !== undefined? 
                                            <Button size="md" variant="secondary" type="submit" href={"/Comentar/"+publicacion.id}>
                                                Comentar
                                            </Button>: <div></div>}{' '}
                                            {cookies.get('rol') === "ADMIN" && cookies.get('correo') !== undefined ? 
                                            <Button size="md" variant="secondary"  type="submit" onClick = {() => this.modificarPublicacion(publicacion.id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                                </svg>
                                            </Button>: <div></div>}{' '}
                                            {cookies.get('rol') === "ADMIN" && cookies.get('correo') !== undefined ? 
                                            <Button size="md" variant="secondary" type="submit" onClick = {() => this.eliminarPublicacion(publicacion.id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                                  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                                </svg>
                                            </Button>: <div></div>}
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Form.Group>
                    </Form.Group>
                </div >
            </div>
        )
    }
}