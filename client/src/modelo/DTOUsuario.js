export default class DTOUsuario {
    constructor(correo, nombre, primerApellido, segundoApellido, telefono, cedula, contrasena, rol){
        this.correo = correo;
        this.nombre = nombre;
        this.primerApellido = primerApellido;
        this.segundoApellido = segundoApellido;
        this.telefono = telefono;
        this.cedula = cedula;
        this.contrasena = contrasena;
        this.rol = rol;
    }

    get correo(){
        return this._correo;
    }
    
    set correo(correo){
        this._correo = correo;
    }

    get nombre(){
        return this._nombre;
    }

    set nombre(nombre){
        this._nombre = nombre;
    }
    
    get primerApellido(){
        return this._primerApellido;
    }

    set primerApellido(primerApellido){
        this._primerApellido = primerApellido;
    }
    
    get segundoApellido(){
        return this._segundoApellido;
    }

    set segundoApellido(segundoApellido){
        this._segundoApellido = segundoApellido;
    }
    
    get telefono(){
        return this._telefono;
    }
    
    set telefono(telefono){
        this._telefono = telefono;
    }

    get cedula(){
        return this._cedula;
    }
    
    set cedula(cedula){
        this._cedula = cedula;
    }

    get contrasena(){
        return this._contrasena;
    }
    
    set contrasena(contrasena){
        this._contrasena = contrasena;
    }

    get rol(){
        return this._rol;
    }
    
    set rol(rol){
        this._rol = rol;
    }
}