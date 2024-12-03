-- MySQL Administrator dump 1.4
--
-- ------------------------------------------------------
-- Server version	5.1.49-1ubuntu8.1


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


--
-- Create schema Asistencia_ESIS
--

DROP DATABASE IF EXISTS `asistencia_esis`;
CREATE DATABASE `asistencia_esis`;
USE `asistencia_esis`;

CREATE TABLE `Persona` (
  `PersonaID` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `TipoDocID` int NOT NULL,
  `NumeroDocumento` varchar(20) UNIQUE NOT NULL,
  `ApellidoPaterno` varchar(25) NOT NULL,
  `ApellidoMaterno` varchar(25) NOT NULL,
  `Nombres` varchar(70) NOT NULL,
  `Sexo` varchar(10) NOT NULL,
  `FechaNacimiento` date,
  `EstadoCivilID` int NOT NULL,
  `CorreoInstitucional` varchar(50),
  `CorreoPersonal` varchar(50),
  `NumeroCelular` varchar(9),
  `NumeroCelular2` varchar(9),
  `GradoInstruccionID` int NOT NULL,
  `TipoPersonaID` int NOT NULL COMMENT 'El rol: admin, estud, prof',
  `Codigo` varchar(11) NOT NULL COMMENT '2021-xxxxxx, AP-000x',
  `Imagen` text NULL,
  `Activo` bool DEFAULT true,
  `FechaRegistro` datetime DEFAULT current_timestamp(),
  `Eliminado` bool DEFAULT false
);

INSERT INTO `Persona` (
  `TipoDocID`, `NumeroDocumento`, `ApellidoPaterno`, `ApellidoMaterno`, `Nombres`, `Sexo`, `FechaNacimiento`, `EstadoCivilID`, 
  `CorreoInstitucional`, `CorreoPersonal`, `NumeroCelular`, `NumeroCelular2`, `GradoInstruccionID`, `TipoPersonaID`, 
  `Codigo`, `Activo`, `FechaRegistro`, `Eliminado`
) VALUES
(
  1, '12345678', 'ADMIN', 'ADMIN', 'ADMIN', 'MASCULINO', NULL, 1, 
  'admin@esisdev.site', NULL, NULL, NULL, 1, 1, 
  '66666666', TRUE, NOW(), FALSE
);

CREATE TABLE `TipoDocumento` (
  `TipoDocID` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `Denominacion` varchar(40) NOT NULL,
  `Activo` bool DEFAULT true,
  `FechaRegistro` datetime DEFAULT current_timestamp(),
  `Eliminado` bool DEFAULT false
);

INSERT INTO TipoDocumento (Denominacion)
VALUES ('DOCUMENTO NACIONAL DE IDENTIDAD'), ('PASAPORTE'), ('CARNET DE EXTRANJERIA');

CREATE TABLE `GradoInstruccion` (
  `GradoInstruccionID` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `Denominacion` varchar(64) NOT NULL,
  `Activo` bool DEFAULT true,
  `FechaRegistro` datetime DEFAULT current_timestamp(),
  `Eliminado` bool DEFAULT false
);

INSERT INTO GradoInstruccion (Denominacion)
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

CREATE TABLE `EstadoCivil` (
  `EstadoCivilID` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `Denominacion` varchar(25) NOT NULL,
  `Activo` bool DEFAULT true,
  `FechaRegistro` datetime DEFAULT current_timestamp(),
  `Eliminado` bool DEFAULT false
);

INSERT INTO EstadoCivil (Denominacion)
VALUES ('NO ESPECIFICADO'), ('SOLTERO'), ('CASADO'), ('DIVORCIADO/SEPARADO'), ('VIUDO'), ('CONVIVIENTE');

CREATE TABLE `TipoPersona` (
  `TipoPersonaID` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `Denominacion` varchar(25) NOT NULL,
  `Activo` bool DEFAULT true,
  `FechaRegistro` datetime DEFAULT current_timestamp(),
  `Eliminado` bool DEFAULT false
);

INSERT INTO TipoPersona (Denominacion)
VALUES 
('ADMINISTRADOR'),
('ESTUDIANTE'),
('DOCENTE');

CREATE TABLE `Credenciales` (
  `CredencialID` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `PersonaID` int NOT NULL,
  `Password` varchar(64),
  `CreatedOn` datetime DEFAULT current_timestamp(),
  `UpdatedOn` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Activo` bool DEFAULT true,
  `Eliminado` bool DEFAULT false
);

INSERT INTO Credenciales (PersonaID, Password)
VALUES 
(1, '$2a$10$T.g7pjSJEc.pYucwdcfrxeeq0G3VcKcp/rEvmARJCPj6UWGMNgG9O');


CREATE TABLE `Facultad` (
  `FacultadID` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `Denominacion` varchar(50) NOT NULL,
  `Abreviatura` varchar(4) UNIQUE,
  `Activo` bool DEFAULT true,
  `FechaRegistro` datetime DEFAULT current_timestamp(),
  `Eliminado` bool DEFAULT false
);

INSERT INTO `Facultad` (`Denominacion`, `Abreviatura`, `Activo`, `FechaRegistro`, `Eliminado`)
VALUES
('FACULTAD DE INGENIERÍA', 'FAIN', TRUE, NOW(), FALSE),
('FACULTAD DE CIENCIAS JURÍDICAS Y EMPRESARIALES', 'FCJE', TRUE, NOW(), FALSE),
('FACULTAD DE CIENCIAS', 'FACI', TRUE, NOW(), FALSE),
('FACULTAD DE CIENCIAS AGROPECUARIAS', 'FCAG', TRUE, NOW(), FALSE),
('FACULTAD DE CIENCIAS DE LA SALUD', 'FACS', TRUE, NOW(), FALSE),
('FACULTAD DE EDUCACIÓN, COMUNICACIÓN Y HUMANIDADES', 'FECH', TRUE, NOW(), FALSE),
('FACULTAD DE INGENIERÍA CIVIL, ARQUITECTURA Y GEOTÉCNIA', 'FIAG', TRUE, NOW(), FALSE);


CREATE TABLE `Escuela` (
  `EscuelaID` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `FacultadID` int NOT NULL,
  `Denominacion` varchar(50) NOT NULL,
  `Abreviatura` varchar(4) UNIQUE,
  `Activo` bool DEFAULT true,
  `FechaRegistro` datetime DEFAULT current_timestamp(),
  `Eliminado` bool DEFAULT false
);

INSERT INTO `Escuela` (`FacultadID`, `Denominacion`, `Abreviatura`, `Activo`, `FechaRegistro`, `Eliminado`)
VALUES
-- Facultad de Ingeniería (FAIN)
(1, 'INGENIERÍA DE MINAS', 'ESMI', TRUE, NOW(), FALSE),
(1, 'INGENIERÍA EN INFORMÁTICA Y SISTEMAS', 'ESIS', TRUE, NOW(), FALSE),
(1, 'INGENIERÍA METALÚRGICA', 'ESME', TRUE, NOW(), FALSE),
(1, 'INGENIERÍA QUÍMICA', 'ESIQ', TRUE, NOW(), FALSE),
(1, 'INGENIERÍA MECÁNICA', 'ESMC', TRUE, NOW(), FALSE),

-- Facultad de Ciencias Jurídicas y Empresariales (FCJE)
(2, 'CIENCIAS CONTABLES Y FINANCIERAS', 'ESCF', TRUE, NOW(), FALSE),
(2, 'CIENCIAS ADMINISTRATIVAS', 'ESAD', TRUE, NOW(), FALSE),
(2, 'DERECHO Y CIENCIAS POLÍTICAS', 'ESDE', TRUE, NOW(), FALSE),
(2, 'INGENIERÍA COMERCIAL', 'ESCO', TRUE, NOW(), FALSE),

-- Facultad de Ciencias (FACI)
(3, 'BIOLOGÍA Y MICROBIOLOGÍA', 'ESBI', TRUE, NOW(), FALSE),
(3, 'FÍSICA APLICADA', 'ESFI', TRUE, NOW(), FALSE),
(3, 'MATEMÁTICAS', 'ESMA', TRUE, NOW(), FALSE),

-- Facultad de Ciencias Agropecuarias (FCAG)
(4, 'AGRONOMÍA', 'ESAG', TRUE, NOW(), FALSE),
(4, 'ECONOMÍA AGRARIA', 'ESEA', TRUE, NOW(), FALSE),
(4, 'MEDICINA VETERINARIA Y ZOOTECNIA', 'ESVZ', TRUE, NOW(), FALSE),
(4, 'INGENIERÍA PESQUERA', 'ESIP', TRUE, NOW(), FALSE),
(4, 'INGENIERÍA EN INDUSTRIAS ALIMENTARIAS', 'ESIA', TRUE, NOW(), FALSE),
(4, 'INGENIERÍA AMBIENTAL', 'ESAM', TRUE, NOW(), FALSE),

-- Facultad de Ciencias de la Salud (FACS)
(5, 'MEDICINA HUMANA', 'ESMH', TRUE, NOW(), FALSE),
(5, 'OBSTETRICIA', 'ESOB', TRUE, NOW(), FALSE),
(5, 'ENFERMERÍA', 'ESEN', TRUE, NOW(), FALSE),
(5, 'ODONTOLOGÍA', 'ESOD', TRUE, NOW(), FALSE),
(5, 'FARMACIA Y BIOQUÍMICA', 'ESFB', TRUE, NOW(), FALSE),

-- Facultad de Educación, Comunicación y Humanidades (FECH)
(6, 'EDUCACIÓN', 'ESED', TRUE, NOW(), FALSE),
(6, 'CIENCIAS DE LA COMUNICACIÓN', 'ESCC', TRUE, NOW(), FALSE),
(6, 'HISTORIA', 'ESHI', TRUE, NOW(), FALSE),

-- Facultad de Ingeniería Civil, Arquitectura y Geotécnia (FIAG)
(7, 'ARQUITECTURA', 'ESAQ', TRUE, NOW(), FALSE),
(7, 'INGENIERÍA CIVIL', 'ESIC', TRUE, NOW(), FALSE),
(7, 'INGENIERÍA GEOLÓGICA - GEOTECNIA', 'ESGE', TRUE, NOW(), FALSE),
(7, 'ARTE', 'ESAR', TRUE, NOW(), FALSE);


CREATE TABLE `Curso` (
  `CursoID` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `EscuelaID` int NOT NULL,
  `SemestreID` int NOT NULL,
  `Denominacion` varchar(50) NOT NULL COMMENT 'Nombre del curso',
  `RefAcademica` varchar(8) UNIQUE NOT NULL COMMENT '19.05427',
  `Credito` int NOT NULL,
  `Regimen` int(1) NOT NULL COMMENT 'Ciclo, I Semestre, II Semestre',
  `Activo` bool DEFAULT true,
  `FechaRegistro` datetime DEFAULT current_timestamp(),
  `Eliminado` bool DEFAULT false
);

-- PRIMERO SEMESTRE
INSERT INTO `Curso` (`EscuelaID`, `SemestreID`, `Denominacion`, `RefAcademica`, `Credito`, `Regimen`, `Activo`, `FechaRegistro`, `Eliminado`)
VALUES
(2, 1, 'MATEMÁTICA', '19.01401', 3, 1, TRUE, NOW(), FALSE),
(2, 1, 'COMUNICACIÓN Y REDACCIÓN', '19.01402', 3, 1, TRUE, NOW(), FALSE),
(2, 1, 'METODOLOGÍA DEL TRABAJO UNIVERSITARIO', '19.01403', 2, 1, TRUE, NOW(), FALSE),
(2, 1, 'FUNDAMENTOS DE PROGRAMACIÓN', '19.01404', 3, 1, TRUE, NOW(), FALSE),
(2, 1, 'QUÍMICA', '19.01405', 3, 1, TRUE, NOW(), FALSE),
(2, 1, 'MATEMÁTICA DISCRETA I', '19.01406', 4, 1, TRUE, NOW(), FALSE),
(2, 1, 'PROGRAMACIÓN GRÁFICA', '19.01407', 4, 1, TRUE, NOW(), FALSE);

-- SEGUNDO SEMESTRE
INSERT INTO `Curso` (`EscuelaID`, `SemestreID`, `Denominacion`, `RefAcademica`, `Credito`, `Regimen`, `Activo`, `FechaRegistro`, `Eliminado`)
VALUES
(2, 2, 'ECOLOGÍA Y AMBIENTE', '19.02408', 3, 2, TRUE, NOW(), FALSE),
(2, 2, 'REALIDAD NACIONAL E INTERNACIONAL', '19.02409', 2, 2, TRUE, NOW(), FALSE),
(2, 2, 'FILOSOFÍA, ÉTICA Y SOCIEDAD', '19.02410', 3, 2, TRUE, NOW(), FALSE),
(2, 2, 'MATEMÁTICA I', '19.02411', 3, 2, TRUE, NOW(), FALSE),
(2, 2, 'FÍSICA I', '19.02412', 3, 2, TRUE, NOW(), FALSE),
(2, 2, 'MATEMÁTICA DISCRETA II', '19.02413', 4, 2, TRUE, NOW(), FALSE),
(2, 2, 'PROGRAMACIÓN AVANZADA', '19.02414', 4, 2, TRUE, NOW(), FALSE);

-- TERCERO SEMESTRE
INSERT INTO `Curso` (`EscuelaID`, `SemestreID`, `Denominacion`, `RefAcademica`, `Credito`, `Regimen`, `Activo`, `FechaRegistro`, `Eliminado`)
VALUES
(2, 3, 'TEORÍA GENERAL DEL SISTEMAS', '19.03415', 2, 1, TRUE, NOW(), FALSE),
(2, 3, 'SISTEMAS ELÉCTRICOS Y ELECTRÓNICOS', '19.03416', 4, 1, TRUE, NOW(), FALSE),
(2, 3, 'ESTRUCTURA DE DATOS', '19.03417', 4, 1, TRUE, NOW(), FALSE),
(2, 3, 'ALGORITMOS Y PROGRAMACIÓN PARALELA', '19.03418', 4, 1, TRUE, NOW(), FALSE),
(2, 3, 'MATEMÁTICA II', '19.03419', 4, 1, TRUE, NOW(), FALSE),
(2, 3, 'ESTADÍSTICA Y PROBABILIDADES', '19.03420', 4, 1, TRUE, NOW(), FALSE);

-- CUARTO SEMESTRE
INSERT INTO `Curso` (`EscuelaID`, `SemestreID`, `Denominacion`, `RefAcademica`, `Credito`, `Regimen`, `Activo`, `FechaRegistro`, `Eliminado`)
VALUES
(2, 4, 'ANÁLISIS DE SISTEMAS', '19.04421', 4, 2, TRUE, NOW(), FALSE),
(2, 4, 'SISTEMAS DIGITALES', '19.04422', 4, 2, TRUE, NOW(), FALSE),
(2, 4, 'MODELADO COMPUTACIONAL PARA INGENIERÍA', '19.04423', 4, 2, TRUE, NOW(), FALSE),
(2, 4, 'CONTABILIDAD, COSTOS Y PRESUPUESTOS', '19.04424', 3, 2, TRUE, NOW(), FALSE),
(2, 4, 'MATEMÁTICA III', '19.04425', 4, 2, TRUE, NOW(), FALSE),
(2, 4, 'INGENIERÍA ECONÓMICA', '19.04426', 3, 2, TRUE, NOW(), FALSE);

-- QUINTO SEMESTRE
INSERT INTO `Curso` (`EscuelaID`, `SemestreID`, `Denominacion`, `RefAcademica`, `Credito`, `Regimen`, `Activo`, `FechaRegistro`, `Eliminado`)
VALUES
(2, 5, 'DISEÑO DE SISTEMAS', '19.05427', 4, 1, TRUE, NOW(), FALSE),
(2, 5, 'ARQUITECTURA DE COMPUTADORES', '19.05428', 4, 1, TRUE, NOW(), FALSE),
(2, 5, 'COMPILADORES Y TEORÍA DE LENGUAJES', '19.05429', 4, 1, TRUE, NOW(), FALSE),
(2, 5, 'BASE DE DATOS I', '19.05430', 4, 1, TRUE, NOW(), FALSE),
(2, 5, 'INVESTIGACIÓN OPERATIVA I', '19.05431', 4, 1, TRUE, NOW(), FALSE);

-- SEXTO SEMESTRE
INSERT INTO `Curso` (`EscuelaID`, `SemestreID`, `Denominacion`, `RefAcademica`, `Credito`, `Regimen`, `Activo`, `FechaRegistro`, `Eliminado`)
VALUES
(2, 6, 'INGENIERÍA DE SOFTWARE I', '19.06432', 4, 2, TRUE, NOW(), FALSE),
(2, 6, 'REDES I', '19.06433', 4, 2, TRUE, NOW(), FALSE),
(2, 6, 'SISTEMAS OPERATIVOS', '19.06434', 3, 2, TRUE, NOW(), FALSE),
(2, 6, 'BASE DE DATOS II', '19.06435', 4, 2, TRUE, NOW(), FALSE),
(2, 6, 'INVESTIGACIÓN OPERATIVA II', '19.06436', 3, 2, TRUE, NOW(), FALSE),
(2, 6, 'LEGISLACIÓN INDUSTRIAL E INFORMÁTICA', '19.06437', 3, 2, TRUE, NOW(), FALSE);

-- SÉPTIMO SEMESTRE
INSERT INTO `Curso` (`EscuelaID`, `SemestreID`, `Denominacion`, `RefAcademica`, `Credito`, `Regimen`, `Activo`, `FechaRegistro`, `Eliminado`)
VALUES
(2, 7, 'INGENIERÍA DE SOFTWARE II', '19.07438', 4, 1, TRUE, NOW(), FALSE),
(2, 7, 'REDES II', '19.07439', 4, 1, TRUE, NOW(), FALSE),
(2, 7, 'SISTEMAS DE INFORMACIÓN', '19.07440', 3, 1, TRUE, NOW(), FALSE),
(2, 7, 'ANALÍTICA DE DATOS', '19.07441', 4, 1, TRUE, NOW(), FALSE),
(2, 7, 'DINÁMICA DE SISTEMAS', '19.07442', 4, 1, TRUE, NOW(), FALSE),
(2, 7, 'PROYECTOS DE TECNOLOGÍAS DE LA INFORMACIÓN', '19.07443', 3, 1, TRUE, NOW(), FALSE);

-- OCTAVO SEMESTRE
INSERT INTO `Curso` (`EscuelaID`, `SemestreID`, `Denominacion`, `RefAcademica`, `Credito`, `Regimen`, `Activo`, `FechaRegistro`, `Eliminado`)
VALUES
(2, 8, 'INGENIERÍA WEB Y APLICACIONES MÓVILES', '19.08444', 4, 2, TRUE, NOW(), FALSE),
(2, 8, 'TALLER DE EMPRENDIMIENTO E INNOVACIÓN', '19.08445', 3, 2, TRUE, NOW(), FALSE),
(2, 8, 'SIMULACIÓN DE SISTEMAS', '19.08446', 4, 2, TRUE, NOW(), FALSE),
(2, 8, 'REALIDAD VIRTUAL', '19.08447', 4, 2, TRUE, NOW(), FALSE),
(2, 8, 'SEGURIDAD INFORMÁTICA', '19.08448', 3, 2, TRUE, NOW(), FALSE),
(2, 8, 'DISEÑO ASISTIDO POR COMPUTADOR', '19.084E1', 4, 2, TRUE, NOW(), FALSE),
(2, 8, 'SISTEMA DE INFORMACIÓN GERENCIAL', '19.084E2', 4, 2, TRUE, NOW(), FALSE),
(2, 8, 'GESTIÓN DE ECOEFICIENCIA EN LA EMPRESA', '19.084E3', 4, 2, TRUE, NOW(), FALSE);

-- NOVENO SEMESTRE
INSERT INTO `Curso` (`EscuelaID`, `SemestreID`, `Denominacion`, `RefAcademica`, `Credito`, `Regimen`, `Activo`, `FechaRegistro`, `Eliminado`)
VALUES
(2, 9, 'TALLER DE TESIS I', '19.09449', 4, 1, TRUE, NOW(), FALSE),
(2, 9, 'INTELIGENCIA ARTIFICIAL', '19.09450', 4, 1, TRUE, NOW(), FALSE),
(2, 9, 'GESTIÓN DE TECNOLOGÍAS DE LA INFORMACIÓN', '19.09451', 3, 1, TRUE, NOW(), FALSE),
(2, 9, 'SISTEMAS EXPERTOS', '19.09452', 4, 1, TRUE, NOW(), FALSE),
(2, 9, 'MÉTODOS CUANTITATIVOS PARA INVESTIGACIÓN', '19.09453', 3, 1, TRUE, NOW(), FALSE),
(2, 9, 'COMPUTACIÓN EN LA NUBE', '19.094E4', 4, 1, TRUE, NOW(), FALSE),
(2, 9, 'TECNOLOGÍAS EMERGENTES', '19.094E5', 4, 1, TRUE, NOW(), FALSE),
(2, 9, 'WEB SEMÁNTICA', '19.094E6', 4, 1, TRUE, NOW(), FALSE);

-- DÉCIMO SEMESTRE
INSERT INTO `Curso` (`EscuelaID`, `SemestreID`, `Denominacion`, `RefAcademica`, `Credito`, `Regimen`, `Activo`, `FechaRegistro`, `Eliminado`)
VALUES
(2, 10, 'TALLER DE TESIS II', '19.10454', 4, 2, TRUE, NOW(), FALSE),
(2, 10, 'PRÁCTICAS PRE PROFESIONALES', '19.10455', 2, 2, TRUE, NOW(), FALSE),
(2, 10, 'ROBÓTICA', '19.10456', 4, 2, TRUE, NOW(), FALSE),
(2, 10, 'AUDITORÍA DE SISTEMAS', '19.10457', 4, 2, TRUE, NOW(), FALSE),
(2, 10, 'PROCESAMIENTO DE IMÁGENES', '19.10458', 4, 2, TRUE, NOW(), FALSE),
(2, 10, 'TRABAJO DE INVESTIGACIÓN', '19.10459', 2, 2, TRUE, NOW(), FALSE),
(2, 10, 'MINERÍA DE DATOS', '19.104E7', 4, 2, TRUE, NOW(), FALSE),
(2, 10, 'REDES DE COMUNICACIÓN AVANZADAS', '19.104E8', 4, 2, TRUE, NOW(), FALSE),
(2, 10, 'CRIPTOGRAFÍA', '19.104E9', 4, 2, TRUE, NOW(), FALSE);


CREATE TABLE `SemestreAcademico` (
  `SemestreID` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `Denominacion` varchar(10) NOT NULL COMMENT 'PRIMERO, SEGUNDO, ..., DECIMO',
  `Activo` bool DEFAULT true,
  `FechaRegistro` datetime DEFAULT current_timestamp(),
  `Eliminado` bool DEFAULT false
);

INSERT INTO `SemestreAcademico` (`Denominacion`, `Activo`, `FechaRegistro`, `Eliminado`)
VALUES
('PRIMERO', TRUE, NOW(), FALSE),
('SEGUNDO', TRUE, NOW(), FALSE),
('TERCERO', TRUE, NOW(), FALSE),
('CUARTO', TRUE, NOW(), FALSE),
('QUINTO', TRUE, NOW(), FALSE),
('SEXTO', TRUE, NOW(), FALSE),
('SÉPTIMO', TRUE, NOW(), FALSE),
('OCTAVO', TRUE, NOW(), FALSE),
('NOVENO', TRUE, NOW(), FALSE),
('DÉCIMO', TRUE, NOW(), FALSE);


CREATE TABLE `PeriodoAcademico` (
  `PeriodoID` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `Anio` int(4) NOT NULL,
  `Ciclo` int(1) NOT NULL,
  `Denominacion` varchar(10) NOT NULL,
  `FechaInicio` date NOT NULL,
  `FechaFin` date NOT NULL,
  `Activo` bool DEFAULT true,
  `FechaRegistro` datetime DEFAULT current_timestamp(),
  `Eliminado` bool DEFAULT false
);

CREATE TABLE `AperturaCurso` (
  `AperturaCursoID` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `CursoID` int NOT NULL,
  `DocenteID` int NULL,
  `PeriodoID` int NOT NULL,
  `Turno` ENUM("M", "T"),
  `Grupo` ENUM("A", "B"),
  `UbicacionID` int NOT NULL,
  `CodigoApertura` varchar(6) NOT NULL COMMENT 'Codigo aleatorio para unirse al curso',
  `AprobacionAutomatica` bool DEFAULT true COMMENT 'Inscripcion automatica a un curso',
  `Activo` bool DEFAULT true,
  `FechaRegistro` datetime DEFAULT current_timestamp(),
  `Eliminado` bool DEFAULT false
);

CREATE TABLE `Ubicacion` (
  `UbicacionID` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `NombreLugar` varchar(50),
  `Latitud` decimal NOT NULL,
  `Longitud` decimal NOT NULL,
  `MargenError` decimal NULL
);

INSERT INTO `Ubicacion` (`NombreLugar`, `Latitud`, `Longitud`, `MargenError`) 
VALUES ('CAMPUS UNIVERSITARIO', -18.025326962159117, -70.24977673183199, 100);
-- -18.024544375475358, -70.25094769430497

CREATE TABLE `Inscripcion` (
  `InscripcionID` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `ClaseID` int NOT NULL,
  `EstudianteID` int NOT NULL,
  `EstadoInscripcion` enum("ACEPTADO","EN ESPERA","RECHAZADO") DEFAULT 'EN ESPERA',
  `FechaRegistro` datetime DEFAULT current_timestamp(),
  `Eliminado` bool DEFAULT false
);

CREATE TABLE `HorarioClase` (
  `HorarioID` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `ClaseID` int NOT NULL,
  `DiaSemana` varchar(20) NOT NULL,
  `HoraInicio` time NOT NULL,
  `HoraFin` time NOT NULL,
  `Tolerancia` int COMMENT 'Tiempo de tolerancia en minutos',
  `TipoClase` enum("TEORICO","PRACTICO","LABORATORIO") DEFAULT 'TEORICO',
  `Activo` bool DEFAULT true,
  `FechaRegistro` datetime DEFAULT current_timestamp(),
  `Eliminado` bool DEFAULT false
);

CREATE TABLE `SesionClase` (
  `SesionID` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `ClaseID` int NOT NULL,
  `DiaSemana` varchar(20) NULL,
  `FechaSesion` DATE NOT NULL,
  `HoraInicio` time NULL,
  `HoraFin` time NULL,
  `Tolerancia` int COMMENT 'Tiempo de tolerancia en minutos',
  `TipoClase` enum("TEORICO","PRACTICO","LABORATORIO") DEFAULT 'TEORICO',
  `CodigoSesion` varchar(6) NULL COMMENT 'Codigo aleatorio para marcar asistencia',
  `FechaRegistro` datetime DEFAULT current_timestamp(),
  `Eliminado` bool DEFAULT false
);

CREATE TABLE `Asistencia` (
  `AsistenciaID` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `EstudianteID` int NOT NULL,
  `SesionID` int NOT NULL,
  `EstadoAsistencia` int DEFAULT 3 COMMENT '1 Asistio; 2 Tarde; 3 Falta; 4 Justificado',
  `Observacion` text,
  `DispositivoID` varchar(50) NULL,
  `Latitud` decimal(9,6) NULL,
  `Longitud` decimal(9,6) NULL,
  `FechaRegistro` datetime DEFAULT current_timestamp(),
  `Eliminado` bool DEFAULT false
);

ALTER TABLE `Persona` ADD FOREIGN KEY (`TipoDocID`) REFERENCES `TipoDocumento` (`TipoDocID`);

ALTER TABLE `Persona` ADD FOREIGN KEY (`GradoInstruccionID`) REFERENCES `GradoInstruccion` (`GradoInstruccionID`);

ALTER TABLE `Persona` ADD FOREIGN KEY (`EstadoCivilID`) REFERENCES `EstadoCivil` (`EstadoCivilID`);

ALTER TABLE `Persona` ADD FOREIGN KEY (`TipoPersonaID`) REFERENCES `TipoPersona` (`TipoPersonaID`);

ALTER TABLE `Escuela` ADD FOREIGN KEY (`FacultadID`) REFERENCES `Facultad` (`FacultadID`);

ALTER TABLE `Curso` ADD FOREIGN KEY (`EscuelaID`) REFERENCES `Escuela` (`EscuelaID`);

ALTER TABLE `Curso` ADD FOREIGN KEY (`SemestreID`) REFERENCES `SemestreAcademico` (`SemestreID`);

ALTER TABLE `AperturaCurso` ADD FOREIGN KEY (`CursoID`) REFERENCES `Curso` (`CursoID`);

ALTER TABLE `AperturaCurso` ADD FOREIGN KEY (`DocenteID`) REFERENCES `Persona` (`PersonaID`);

ALTER TABLE `AperturaCurso` ADD FOREIGN KEY (`PeriodoID`) REFERENCES `PeriodoAcademico` (`PeriodoID`);

ALTER TABLE `AperturaCurso` ADD FOREIGN KEY (`UbicacionID`) REFERENCES `Ubicacion` (`UbicacionID`);

ALTER TABLE `Inscripcion` ADD FOREIGN KEY (`ClaseID`) REFERENCES `AperturaCurso` (`AperturaCursoID`);

ALTER TABLE `Inscripcion` ADD FOREIGN KEY (`EstudianteID`) REFERENCES `Persona` (`PersonaID`);

ALTER TABLE `HorarioClase` ADD FOREIGN KEY (`ClaseID`) REFERENCES `AperturaCurso` (`AperturaCursoID`);

ALTER TABLE `SesionClase` ADD FOREIGN KEY (`ClaseID`) REFERENCES `AperturaCurso` (`AperturaCursoID`);

ALTER TABLE `Asistencia` ADD FOREIGN KEY (`SesionID`) REFERENCES `SesionClase` (`SesionID`);

ALTER TABLE `Asistencia` ADD FOREIGN KEY (`EstudianteID`) REFERENCES `Persona` (`PersonaID`);

ALTER TABLE `Credenciales` ADD FOREIGN KEY (`PersonaID`) REFERENCES `Persona` (`PersonaID`);


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;

DELIMITER $$

CREATE TRIGGER after_insert_sesionclase
AFTER INSERT ON SesionClase
FOR EACH ROW
BEGIN
    -- Inserta un registro en Asistencia para cada estudiante aceptado en la misma ClaseID
    INSERT INTO Asistencia (SesionID, EstudianteID)
    SELECT NEW.SesionID, i.EstudianteID
    FROM Inscripcion i
    WHERE i.ClaseID = NEW.ClaseID
      AND i.EstadoInscripcion = 'ACEPTADO';
END$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER after_update_estado_inscripcion
AFTER UPDATE ON Inscripcion
FOR EACH ROW
BEGIN
    IF NEW.EstadoInscripcion = 'ACEPTADO' AND OLD.EstadoInscripcion != 'ACEPTADO' THEN
        -- Verificar y evitar duplicados en Asistencia
        INSERT INTO Asistencia (SesionID, EstudianteID)
        SELECT sc.SesionID, NEW.EstudianteID
        FROM SesionClase sc
        WHERE sc.ClaseID = NEW.ClaseID
        AND NOT EXISTS (
            SELECT 1
            FROM Asistencia a
            WHERE a.SesionID = sc.SesionID
              AND a.EstudianteID = NEW.EstudianteID
        );
    END IF;
END$$

DELIMITER ;
