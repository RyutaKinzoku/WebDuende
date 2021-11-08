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
        categoria:{
            nombre: '',
            id: '',
        },
        subcategoria:{
            nombre: '',
            id: '',
        },
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
                categoria: {id: cat.id}
            })
            this.obtenerSubcategorias(cat.id)
        }
        this.setState({
            subcategoria:{
                nombre: '',
                id: '',
            }
        })
    }

    setSubcategoria = async() => {
        let sub = this.state.subcategorias.find(s => s.nombre === document.getElementById('combo-box-subcategoria').value)
        if(sub !== undefined){
            this.setState({
                subcategoria: {id: sub.id}
            })
        }
    }

    cargarPublicacion = async() => {
        let controladora = new Controladora();
        let categoriasBD = await controladora.obtenerCategorias();
        var nombresCategorias = [];
        categoriasBD.forEach(c =>
            nombresCategorias.push({nombre: c.nombre, id: c.id})
        )
        this.setState({
            categorias: nombresCategorias
        })
        let publicacion = (await controladora.obtenerPublicacion(this.props.match.params.id)).data[0];
        this.obtenerSubcategorias(publicacion.idCategoria);
        if(this.state.subcategorias.length > 0){
            this.setState({
                imagen: publicacion.imagen,
                descripcion:publicacion.descripcion,
                tags:publicacion.tags,
                categoria: this.state.categorias.find(c => c.id === publicacion.idCategoria),
                subcategoria:this.state.categorias.find(s => s.id === publicacion.idSubcategoria),
            })
        } else {
            this.setState({
                imagen: publicacion.imagen,
                descripcion:publicacion.descripcion,
                tags:publicacion.tags,
                categoria: this.state.categorias.find(c => c.id === publicacion.idCategoria),
            })
        }
    }

    componentDidMount() {
        this.cargarPublicacion();
    }

    modificarPublicacion  = async (e) => {
        e.preventDefault();
        if(this.state.imagen !== null && this.state.descripcion !== "" && this.state.tags !== "" && this.state.categoria !== ""){
        let controladora = new Controladora();
        try{
            if(this.state.subcategoria.id === '' || this.state.subcategoria.id == null){
                await controladora.modificarPublicacion(
                    this.props.match.params.id,
                    this.state.imagen,
                    this.state.descripcion,
                    this.state.tags,
                    this.state.categoria.id,
                    0
                );
            } else {
                await controladora.modificarPublicacion(
                    this.props.match.params.id,
                    this.state.imagen,
                    this.state.descripcion,
                    this.state.tags,
                    this.state.categoria.id,
                    this.state.subcategoria.id
                );
            }
            swal("Publicación modificada","","success");
            window.location.href="/galeria";
        } catch (err){
            swal("Error al modificar","", "warning");
        }
    } else {
        swal("Alguna casilla se encuentra vacía","" ,"warning");
    }
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
                                        <Autocomplete
                                        disablePortal
                                        id="combo-box-categoria"
                                        options={this.state.categorias}
                                        sx={{ width: 300 }}
                                        nombre = 'categoria'
                                        getOptionLabel={(option) => option.nombre}
                                        onBlur = {() => this.setCategoria()}
                                        defaultValue= {this.state.categoria}
                                        renderInput={(params) => <TextField {...params} label="Categoria" defaultValue= {this.state.categoria.nombre} />}
                                        />
                                        <br/>
                                        <h6>Subcategoría:</h6>
                                        <Autocomplete
                                        disablePortal
                                        id="combo-box-subcategoria"
                                        options={this.state.subcategorias}
                                        sx={{ width: 300 }}
                                        nombre = 'subcategoria'
                                        getOptionLabel={(option) => option.nombre}
                                        onBlur = {() => this.setSubcategoria()}
                                        defaultValue={this.state.subcategoria}
                                        renderInput={(params) => <TextField {...params} label="Subcategoria" defaultValue= {this.state.subcategoria.nombre}/>}
                                        />
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
                        <Col sm = {5}>
                            <div className="center container w-55 p-8 py-2 my-3  mt-5">
                                <Image src={`${process.env.PUBLIC_URL}/assets/images/${this.state.imagen}`} rounded fluid/>
                            </div>
                        </Col>
                    </Row>    
                </div >
            </div>
        )
    }
}