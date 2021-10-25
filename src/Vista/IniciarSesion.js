import React, {Component} from 'react';
import {Button, Form } from "react-bootstrap";
import Style from '../css/Style-login.css';
import Cookies from "universal-cookie";
import swal from "sweetalert";

const cookies = new Cookies();

export default class IniciarSesion extends Component{

    estado = {
        correo: '',
        contrasena: '',
    }

    handleChange = e => {
        this.setState({
            ...this.estado,
            [e.target.name]: e.target.value
        })
    }

    enviar  = async (e) => {
            await axios.get('http://localhost:3001/api/user/login',{params: {username: this.state.username, password: this.state.password} })
            .then(response => {
                console.log(response)
                return response.data;
            })
            .then(response=>{
                if(response.length>0){
                    let respuesta=response[0];
                    cookies.set('username',     respuesta.username,    {path: "/"});
                    cookies.set('email',        respuesta.email,       {path: "/"});
                    cookies.set('first_name',   respuesta.first_name,  {path: "/"});
                    cookies.set('last_name',    respuesta.last_name,   {path: "/"});
                    cookies.set('birthday',     respuesta.birthday,    {path: "/"});
                    cookies.set('id_image',     respuesta.id_image,    {path: "/"});
                    cookies.set('role',         respuesta.role,        {path: "/"});
                    swal("Usuario encontrado","" ,"success").then((value) => {
                        window.location.href="/principal";
                    })

                }else{
                    swal("Usuario no encontrado","" ,"warning")
                }
            })
            .catch(error =>{
                console.log(error);
            })
    }

    render(){
        return(
            <div>
                {console.log(this.state) }
                <h2>
                    <div id="fondo">
                    <h1>Login</h1>
                    </div>
                </h2>
                <div className="center container w-25 p-8 py-2 my-3  mt-5">
                    <Form.Group className="mb-3" controlId="formBasicEmail">

                        <div>
                            <Form.Group onChange= {this.handleChange}>
                                <br/>
                                <Form.Control type="text" placeholder="User name" name = 'username' />
                                <br/>
                                <Form.Control type="password" placeholder="Password" name = 'password' />
                                <br/>
                            </Form.Group>

                        </div>
                        <div className="d-grid gap-2 ">
                            <Button size="lg" variant="outline-success" type="submit" onClick = {this.onSubmit} >
                                Login
                            </Button>

                            <Button variant="light" href='/sign' >
                                    Register
                            </Button>
                        </div>
                    </Form.Group>
                </div >

                <footer id="footerAbsolute">
                    <div>TEC-digitalito</div>
                    <div>Versión 1.0 por Instituto Tecnológico de Costa Rica</div>
                    <div>Semestre II de 2021. Bases de datos 2</div>
                </footer>
            </div>
        )
    }
}