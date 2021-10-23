export default class Usuario {
    constructor(correo, nombre, primerApellido, segundoApellido, telefono, cedula, contraseña, rol){
        this.correo = correo;
        this.nombre = nombre;
        this.primerApellido = primerApellido;
        this.segundoApellido = segundoApellido;
        this.telefono = telefono;
        this.cedula = cedula;
        this.contraseña = contraseña;
        this.rol = rol;
    }

    get correo(){
        return this.correo;
    }
    
    set correo(correo){
        this.correo = correo;
    }

    get nombre(){
        return this.nombre;
    }

    set nombre(nombre){
        this.nombre = nombre;
    }
    
    get primerApellido(){
        return this.primerApellido;
    }

    set primerApellido(primerApellido){
        this.primerApellido = primerApellido;
    }
    
    get segundoApellido(){
        return this.segundoApellido;
    }

    set segundoApellido(segundoApellido){
        this.segundoApellido = segundoApellido;
    }
    
    get telefono(){
        return this.telefono;
    }
    
    set telefono(telefono){
        this.telefono = telefono;
    }

    get cedula(){
        return this.cedula;
    }
    
    set cedula(cedula){
        this.cedula = cedula;
    }

    get contraseña(){
        return this.contraseña;
    }
    
    set contraseña(contraseña){
        this.contraseña = contraseña;
    }

    get rol(){
        return this.rol;
    }
    
    set rol(rol){
        this.rol = rol;
    }
}