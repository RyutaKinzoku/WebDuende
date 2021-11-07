import React, {Component} from 'react';
import {Button, Nav, Navbar, Container, Form } from "react-bootstrap";
import Cookies from "universal-cookie";
import swal from "sweetalert";
import NavStyle from "./css/NavStyle.css";
import Dropdown from '@restart/ui/esm/Dropdown';
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Controladora from "../Controladora/Controladora";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const cookies = new Cookies();

export default class modificarPublicacion extends Component{

    state = {
        imagen: null,
        descripcion:'',
        tags:'',
        categoria:'',
        subcategoria:'',
        categorias: [],
        subcategorias: [],
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
        if (e.target.files) {
            let imagen = e.target.files;
            this.setState({imagen: imagen}, () => { console.log(this.state.imagen[0]) })
        } else {
            console.log("Selecione un archivo")
        }
    }

    setCategoria = async() => {
        let cat = this.state.categorias.find(c => c.nombre === document.getElementById('combo-box-categoria').value)
        if(cat !== undefined){
            this.setState({
                categoria: cat.id
            })
            this.obtenerSubcategorias(cat.id)
        }
        this.setState({
            subcategoria: ''
        })
    }

    setSubcategoria = async() => {
        let sub = this.state.subcategorias.find(s => s.nombre === document.getElementById('combo-box-subcategoria').value)
        if(sub !== undefined){
            this.setState({
                subcategoria: sub.id
            })
        }
    }

    componentDidMount() {
        this.obtenerPublicacion(this.props.match.params.id);
        this.obtenerCategorias();
    }

    obtenerPublicacion = async(idPublicacion) =>{
        let controladora = new Controladora();
        let publicacion = (await controladora.obtenerPublicacion(idPublicacion)).data[0];
        console.log(publicacion.idCategoria)
        console.log(publicacion.idSubcategoria)
        this.obtenerSubcategorias(publicacion.idCategoria);
        this.setState({
            imagen: publicacion.imagen,
            descripcion:publicacion.descripcion,
            tags:publicacion.tags,
            categoria:publicacion.idCategoria,
            subcategoria:publicacion.idSubcategoria,
        })
        console.log(this.state.categoria)
    }

    modificarPublicacion  = async (e) => {
        e.preventDefault();
        let controladora = new Controladora();
        try{
            if(this.state.subcategoria === ''){
                await controladora.modificarPublicacion(
                    this.props.match.params.id,
                    this.state.imagen,
                    this.state.descripcion,
                    this.state.tags,
                    this.state.categoria,
                );
            } else {
                await controladora.modificarPublicacion(
                    this.props.match.params.id,
                    this.state.imagen,
                    this.state.descripcion,
                    this.state.tags,
                    this.state.categoria,
                    this.state.subcategoria
                );
            }
            swal("Publicación modificada","","success");
            //window.location.href="/galeria";
        } catch (err){
            swal("Error al modificar","", "warning");
        }
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

    obtenerSubcategorias = async(idCategoria) => {
        let controladora = new Controladora();
        let subcategoriasBD = await controladora.obtenerSubcategorias(idCategoria);
        var nombresSubcategorias = [];
        subcategoriasBD.forEach(s =>
            nombresSubcategorias.push({nombre: s.nombre, id: s.id})
        )
        this.setState({
            subcategorias: nombresSubcategorias
        })
    }

    render(){
        return(
            <div>
                <Navbar id="#navBar" collapseOnSelect bg="secondary" variant="light" expand="lg">
                    <Container>
                        <Navbar.Brand id="navTitle" href="">Modificar Publicacion</Navbar.Brand>
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
                                    <h6>Por favor, modifique los datos deseados: </h6>
                                        <br/>
                                        <h6>Imagen:</h6>
                                        <Form.Control type="file" name='imagen' defaultValue={this.state.imagen}/>
                                        <br/>
                                        <h6>Descripcion:</h6>
                                        <Form.Control type="text" name = 'descripcion' defaultValue={this.state.descripcion}/>
                                        <br/>
                                        <h6>Tags:</h6>
                                        <Form.Control type="text" name = 'tags' defaultValue={this.state.tags}/>
                                        <br/>
                                        <h6>Categoría:</h6>
                                        <br/>
                                        <h6>Subcategoría:</h6>
                                        <br/>
                                    </Form.Group>
                                </div>
                                <div className="d-grid gap-2">
                                    <Button size="md" variant="secondary" type="submit" onClick={this.modificarPublicacion}>
                                        Modificar
                                    </Button>
                                    <Button size="md" variant="secondary" type="submit" href = "/galeria">
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