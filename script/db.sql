-- DROP DATABASE IF EXISTS `assistance3`;
-- USE `assistance3`;

CREATE TABLE tipo_documento (
    id INT PRIMARY KEY AUTO_INCREMENT,
    descripcion VARCHAR(50) NOT NULL
);

CREATE TABLE estado_civil (
    id INT PRIMARY KEY AUTO_INCREMENT,
    descripcion VARCHAR(50) NOT NULL
);

CREATE TABLE grado_instruccion (
    id INT PRIMARY KEY AUTO_INCREMENT,
    descripcion VARCHAR(100) NOT NULL
);

CREATE TABLE tipo_persona (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL
);

CREATE TABLE persona (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tipo_doc_id INT,
    nro_documento VARCHAR(20) NOT NULL UNIQUE,
    apellido_paterno VARCHAR(50),
    apellido_materno VARCHAR(50),
    nombres VARCHAR(100),
    sexo ENUM('M', 'F', 'otro'),
    nro_celular VARCHAR(12),
    correo_institucional VARCHAR(50),
    correo_personal VARCHAR(50),
    fecha_nacimiento DATE,
    estado_civil_id INT,
    grado_instruccion_id INT,
    tipo_pers_id INT,
    FOREIGN KEY (tipo_doc_id) REFERENCES tipo_documento(id),
    FOREIGN KEY (estado_civil_id) REFERENCES estado_civil(id),
    FOREIGN KEY (grado_instruccion_id) REFERENCES grado_instruccion(id),
    FOREIGN KEY (tipo_pers_id) REFERENCES tipo_persona(id)
);

CREATE TABLE credenciales (
    id INT PRIMARY KEY AUTO_INCREMENT,
    persona_id INT,
    username VARCHAR(12),
    password VARCHAR(64),
    created_at DATETIME DEFAULT current_timestamp(),
    updated_at DATETIME DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    FOREIGN KEY (persona_id) REFERENCES persona(id)
);


INSERT INTO tipo_documento (descripcion)
VALUES ('DOCUMENTO NACIONAL DE IDENTIDAD'), ('PASAPORTE');

INSERT INTO estado_civil (descripcion)
VALUES ('NO ESPECIFICADO'), ('SOLTERO'), ('CASADO'), ('DIVORCIADO/SEPARADO'), ('VIUDO'), ('CONVIVIENTE');


INSERT INTO grado_instruccion (descripcion)
VALUES
('NO ESPECIFICADO'),
('SIN EDUCACIÓN FORMAL'),
('EDUCACIÓN ESPECIAL INCOMPLETA'),
('EDUCACIÓN ESPECIAL COMPLETA'),
('EDUCACIÓN PRIMARIA INCOMPLETA'),
('EDUCACIÓN PRIMARIA COMPLETA'),
('EDUCACIÓN SECUNDARIA INCOMPLETA'),
('EDUCACIÓN SECUNDARIA COMPLETA'),
('EDUCACIÓN TÉCNICA INCOMPLETA'),
('EDUCACIÓN TÉCNICA COMPLETA'),
('EDUCACIÓN SUPERIOR (INSTITUTO SUPERIOR, ETC) INCOMPLETA'),
('EDUCACIÓN SUPERIOR (INSTITUTO SUPERIOR, ETC) COMPLETA'),
('EDUCACIÓN UNIVERSITARIA INCOMPLETA'),
('EDUCACIÓN UNIVERSITARIA COMPLETA'),
('GRADO DE BACHILLER'),
('TITULADO'),
('ESTUDIOS DE MAESTRÍA INCOMPLETA'),
('ESTUDIOS DE MAESTRÍA COMPLETA'),
('GRADO DE MAESTRÍA'),
('ESTUDIOS DE DOCTORADO INCOMPLETO'),
('ESTUDIOS DE DOCTORADO COMPLETO'),
('GRADO DE DOCTOR');


INSERT INTO tipo_persona (nombre)
VALUES 
('ADMINISTRADOR'),
('ESTUDIANTE'),
('DOCENTE');

INSERT INTO `persona` (`id`, `tipo_doc_id`, `nro_documento`, `apellido_paterno`, `apellido_materno`, `nombres`, `sexo`, `nro_celular`, `correo_institucional`, `correo_personal`, `fecha_nacimiento`, `estado_civil_id`, `grado_instruccion_id`, `tipo_pers_id`) VALUES (NULL, '1', '12345678', 'CHOQUE', 'SURCO', 'OSCAR ALEJANDRO', 'M', '938644684', 'oachoques@unjbg.edu.pe', 'oscarchoque@gmail.com', NULL, '2', '14', '1');

INSERT INTO credenciales (persona_id, username, password)
VALUES 
(1, '2021-119080', '$2a$10$T.g7pjSJEc.pYucwdcfrxeeq0G3VcKcp/rEvmARJCPj6UWGMNgG9O');
