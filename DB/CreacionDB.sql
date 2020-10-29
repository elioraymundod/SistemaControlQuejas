CREATE DATABASE ControlQuejasDB;

CREATE TABLE `catalogos` (
  `codigo_catalogo` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(250) NOT NULL,
  `descripcion` varchar(250) NOT NULL,
  `fecha_creacion` date NOT NULL,
  `fecha_modificacion` date NULL,
  PRIMARY KEY (`codigo_catalogo`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `datos_catalogos` (
  `codigo_dato_catalogo` int NOT NULL AUTO_INCREMENT,
  `codigo_catalogo` int NOT NULL,
  `nombre` varchar(250) NOT NULL,
  `descripcion` varchar(250) NOT NULL,
  `fecha_creacion` date NOT NULL,
  `fecha_modificacion` date NULL,
  PRIMARY KEY (`codigo_dato_catalogo`),
  CONSTRAINT `codigo_catalogo_a` FOREIGN KEY (`codigo_catalogo`) REFERENCES `catalogos` (`codigo_catalogo`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `tipos_quejas` (
  `codigo_tipo_queja` int NOT NULL AUTO_INCREMENT,
  `codigo_estado` int NOT NULL,
  `siglas` varchar(10) NOT NULL,
  `descripcion_tipo_queja` varchar(250) NOT NULL,
  `fecha_creacion` date NOT NULL,
  `fecha_modificacion` date NULL,
  PRIMARY KEY (`codigo_tipo_queja`) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `puntos_atencion` (
  `codigo_punto_atencion` int NOT NULL AUTO_INCREMENT,
  `codigo_region` int NOT NULL,
  `codigo_estado` int NOT NULL,  
  `nombre_punto_atencion` varchar(120) NOT NULL,
  `fecha_creacion` date NOT NULL,
  `fecha_modificacion` date NULL,
  PRIMARY KEY (`codigo_punto_atencion`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `usuarios` (
  `dpi_usuario` varchar(16) NOT NULL,
  `rol` int NOT NULL,
  `nombre` varchar(120) NOT NULL,
  `usuario` varchar(20) NOT NULL,
  `password` varchar(30) NOT NULL,
  `fecha_creacion` date NOT NULL,
  `fecha_modificacion` date NULL,
  PRIMARY KEY (`dpi_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `usuarios_puntos_atencion` (
  `codigo_usuario_punto` int NOT NULL AUTO_INCREMENT,
  `codigo_estado` int NOT NULL,
  `codigo_punto` int NOT NULL,
  `dpi_usuario` varchar(16) NOT NULL, 
  `codigo_cargo` int NOT NULL, 
  `correo_electronico` varchar(50) NOT NULL,
  `fecha_creacion` date NOT NULL,
  `fecha_modificacion` date NULL,
  PRIMARY KEY (`codigo_usuario_punto`),
  CONSTRAINT `codigo_punto_a` FOREIGN KEY (`codigo_punto`) REFERENCES `puntos_atencion` (`codigo_punto_atencion`),
  CONSTRAINT `dpi_usuario_a` FOREIGN KEY (`dpi_usuario`) REFERENCES `usuarios` (`dpi_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `quejas` (
  `codigo_queja` int NOT NULL AUTO_INCREMENT,
  `codigo_etapa` int NOT NULL,
  `codigo_tipo_creador` int NOT NULL,
  `codigo_region_evento` int NOT NULL,
  `codigo_medio_ingreso` int NOT NULL,
  `codigo_estado_externo` int NOT NULL,  
  `codigo_estado_interno` int NOT NULL,  
  `codigo_tipo_queja` int NOT NULL,
  `codigo_punto_atencion` int NOT NULL,  
  `dpi_usuario` varchar(16),  
  `nombre` varchar(120) NOT NULL,
  `correo_electronico` varchar(50) NOT NULL,
  `nombre_empleado` varchar(120),
  `detalle_queja` varchar(1000) NOT NULL,
  `fecha_creacion` date NOT NULL,
  `fecha_modificacion` date NULL,
  `hora_ingreso` time NOT NULL,
  `correlativo` varchar(80),  
  `documento_soporte` varchar(80),
  PRIMARY KEY (`codigo_queja`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;