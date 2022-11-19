CREATE TABLE Consecutivo(
    nombre VARCHAR(15) NOT NULL PRIMARY KEY,
    ultimo_valor INT NOT NULL
);

CREATE TABLE Categoria(
    ID INT NOT NULL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL
);

CREATE TABLE Subcategoria(
    ID INT NOT NULL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    idCategoria INT NOT NULL,
    KEY idCategoria_idx(idCategoria)
);

CREATE TABLE Usuario(
    correo VARCHAR(255) NOT NULL PRIMARY KEY,
    nombre VARCHAR(64) NOT NULL,
    primerApellido VARCHAR(64) NOT NULL,
    segundoApellido VARCHAR(64) NOT NULL,
    telefono INT NOT NULL,
    cedula INT NOT NULL,
    contrasena VARCHAR(64) NOT NULL,
    rol VARCHAR(16) NOT NULL
);

CREATE TABLE Curso(
    ID INT NOT NULL PRIMARY KEY,
    fechaHoraInicio DATETIME NOT NULL,
    fechaHoraFin DATETIME NOT NULL,
    lugar VARCHAR(255) NOT NULL,
    titulo VARCHAR(255) NOT NULL
);

CREATE TABLE Compromiso(
    ID INT NOT NULL PRIMARY KEY,
    fechaHoraInicio DATETIME NOT NULL,
    fechaHoraFin DATETIME NOT NULL,
    lugar VARCHAR(255) NOT NULL,
    correoUsuario VARCHAR(255) NOT NULL
);

CREATE TABLE ServicioIndividual(
    ID INT NOT NULL PRIMARY KEY,
    fechaHoraInicio DATETIME NOT NULL,
    fechaHoraFin DATETIME NOT NULL,
    lugar VARCHAR(255) NOT NULL,
    correoUsuario VARCHAR(255) NOT NULL,
    KEY correoUsuario_idx(correoUsuario)
);

CREATE TABLE Cita(
    ID INT NOT NULL PRIMARY KEY,
    fechaHoraInicio DATETIME NOT NULL,
    fechaHoraFin DATETIME NOT NULL,
    lugar VARCHAR(255) NOT NULL,
    correoUsuario VARCHAR(255) NOT NULL,
    idPublicacion INT NOT NULL,
    KEY correoUsuario_idx(correoUsuario),
    KEY idPublicacion_idx(idPublicacion)
);

CREATE TABLE Entrega(
    ID INT NOT NULL PRIMARY KEY,
    fechaHoraInicio DATETIME NOT NULL,
    fechaHoraFin DATETIME NOT NULL,
    lugar VARCHAR(255) NOT NULL,
    correoUsuario VARCHAR(255) NOT NULL,
    idOrdenCompra INT NOT NULL,
    KEY correoUsuario_idx(correoUsuario),
    KEY idOrdenCompra_idx(idOrdenCompra)
);

INSERT INTO `Usuario` (correo, nombre, primerApellido, segundoApellido, telefono, cedula, contrasena, rol)
VALUES  ('duende@gmail.com', 'Raquel', 'Fernández', 'Steller', 84654654, 1654598546, 'duende123', 'ADMIN');