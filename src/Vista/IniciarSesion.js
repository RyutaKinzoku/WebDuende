import React, {Component} from 'react';
import {Button, Form } from "react-bootstrap";
import Cookies from "universal-cookie";
import swal from "sweetalert";

const cookies = new Cookies();

export default class IniciarSesion extends Component{

    state = {
        correo: '',
        contrasena: '',
    }

    handleChange = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    enviar  = async (e) => {}

    render(){
        return(
            <div>
                
                <div className="center container w-25 p-8 py-2 my-3  mt-5">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <h2>
                            <div id="fondo">
                                <p>Por favor, ingrese los siguientes datos: </p>
                            </div>
                        </h2>
                        <div>
                            <Form.Group onChange= {this.handleChange}>
                                <br/>
                                <h5>Correo:</h5>
                                <Form.Control type="text" name = 'correo' />
                                <br/>
                                <h5>Contraseña:</h5>
                                <Form.Control type="password" name = 'contrasena' />
                                <br/>
                            </Form.Group>

                        </div>
                        <div className="d-grid gap-2 ">
                            <Button size="lg" variant="outline-success" type="submit">
                                Iniciar Sesión
                            </Button>
                        </div>
                    </Form.Group>
                </div >
            </div>
        )
    }
}