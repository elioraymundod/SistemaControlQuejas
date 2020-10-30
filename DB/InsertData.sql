INSERT INTO `catalogos` VALUES (1, 'Regiones', 'Regiones para los puntos de atencion y para los usuarios', '2020-09-10', null),
    							(2, 'Estados', 'Estados de los usuarios y de las quejas', '2020-09-10', null),
                                (3, 'Etapas', 'Etapas de las quejas', '2020-09-10', null),
                                (4, 'Cargos', 'Cargos de los usuarios', '2020-09-10', null),
                                (5, 'Medios de ingreso de quejas', 'Medios por los cuales se puede ingresar una queja', '2020-09-10', null),
                                (6, 'Tipos de creadores de quejas', 'Tipos que pueden crear una queja', '2020-09-10', null),
                                (7, 'Estados externos', 'Estados externos de una queja', '2020-09-10', null),
                                (8, 'Estados internos', 'Estados internos de una queja', '2020-09-10', null),
								(9, 'Roles', 'Roles', '2020-09-10', null);

INSERT INTO `datos_catalogos` VALUES (1, 1, 'Región Central', 'Región Central', '2020-09-10', null),
                                        (2, 1, 'Región Sur', 'Región Sur', '2020-09-10', null),
                                        (3, 1, 'Región Nororiente', 'Región Nororiente', '2020-09-10', null),
                                        (4, 1, 'Región Occidente', 'Región Occidente', '2020-09-10', null),
                                        (5, 2, 'Activo', 'Activo', '2020-09-10', null),
                                        (6, 2, 'Inactivo', 'Inactivo', '2020-09-10', null),
                                        (7, 2, 'En análisis', 'En análisis', '2020-09-10', null),
                                        (8, 2, 'Finalizada', 'Finalizada', '2020-09-10', null),
                                        (9, 3, 'En análisis', 'En análisis', '2020-09-10', null),
                                        (10, 3, 'No aplica', 'No aplica', '2020-09-10', null),
                                        (11, 3, 'En seguimiento', 'En seguimiento', '2020-09-10', null),
                                        (12, 3, 'No procedente', 'No procedente', '2020-09-10', null),
                                        (13, 3, 'Reanálisis', 'Reanálisis', '2020-09-10', null),
                                        (14, 4, 'Titular del punto de atención', 'Titular del punto de atención', '2020-09-10', null),
                                        (15, 4, 'Suplente', 'Suplente', '2020-09-10', null),
                                        (16, 4, 'Encargado', 'Encargado', '2020-09-10', null),
                                        (17, 4, 'Jefe inmediato', 'Jefe inmediato', '2020-09-10', null),
                                        (18, 4, 'Receptor de quejas', 'Receptor de quejas', '2020-09-10', null),
                                        (19, 4, 'Centralizador de quejas', 'Centralizador de quejas', '2020-09-10', null),
                                        (20, 5, 'Teléfono', 'Teléfono', '2020-09-10', null),
                                        (21, 5, 'Correo', 'Correo', '2020-09-10', null),
                                        (22, 5, 'Chat', 'Chat', '2020-09-10', null),
                                        (23, 5, 'Presencial', 'Presencial', '2020-09-10', null),
                                        (24, 5, 'Apliación móvil', 'Aplicación móvil', '2020-09-10', null),
                                        (25, 5, 'Portal', 'Portal', '2020-09-10', null),
                                        (26, 6, 'Cliente', 'Cliente', '2020-09-10', null),
                                        (27, 6, 'Contribuyente', 'Contribuyente', '2020-09-10', null),
                                        (28, 7, 'Presentada', 'Presentada', '2020-09-10', null),
                                        (29, 8, 'Presentada', 'Presentada', '2020-09-10', null),
										(30, 9, 'Administrador', 'Administrador', '2020-09-23', null),
										(31, 9, 'Operador', 'Operador', '2020-09-23', null),
										(32, 9, 'Centralizador', 'Centralizador', '2020-09-23', null),
										(33, 9, 'Receptor', 'Receptor', '2020-09-23', null);

INSERT INTO `puntos_atencion` VALUES (1, 1, 5, 'Punto naranja', '2020-09-10', null);
INSERT INTO `puntos_atencion` VALUES (2, 1, 5, 'Punto morado', '2020-09-10', null);
INSERT INTO `puntos_atencion` VALUES (3, 2, 5, 'Punto verde', '2020-09-10', null);
INSERT INTO `puntos_atencion` VALUES (4, 3, 5, 'Punto blanco', '2020-09-10', null);
INSERT INTO `puntos_atencion` VALUES (5, 4, 5, 'Punto amarillo', '2020-09-10', null);
INSERT INTO `puntos_atencion` VALUES (6, 4, 5, 'Punto dorado', '2020-09-10', null);

INSERT INTO `usuarios` VALUES(11111111,30,'Vanessa Alexandra Grande Morales', 'Vane17', 'Dios es amor', '2020-09-15', null);
INSERT INTO `usuarios` VALUES(22222222,31,'Karla leticia Gonzales Gonzales', 'KarlaGG', '1234', '2020-09-16', null);
INSERT INTO `usuarios` VALUES(33333333,32,'Gerardo Molina Silva Joc', 'GerMSJ', '1234', '2020-09-20', null);
INSERT INTO `usuarios` VALUES(44444444,33,'Sol Sofia Miranda Lopez', 'Sofy234', '1234', '2020-09-20', null);
INSERT INTO `usuarios` VALUES(55555555,33,'Jaime Godoy', 'JAGS', '1234', '2020-09-20', null);
INSERT INTO `usuarios` VALUES(66666666,34,'Elio Isai Raymundo Diaz', 'eraymundo', '1', '2020-09-20', null);

INSERT INTO `usuarios_puntos_atencion` VALUES (1, 5, 1,11111111,17,'vanessa@gmail.com','2020-09-24', null);
INSERT INTO `usuarios_puntos_atencion` VALUES (2, 5, 2,22222222,18,'karla@gmail.com','2020-09-24', null);
INSERT INTO `usuarios_puntos_atencion` VALUES (3, 5, 3,33333333,19,'ger17@gmail.com','2020-09-24', null);

INSERT INTO `tipos_quejas` values (1, 5, 'QMS', 'Quejas por Mal Servicio o servicio no conforme', '2020-10-28', null);
INSERT INTO `tipos_quejas` values (1, 5, 'ROE', 'Reclamo por objetos extraviados ', '2020-10-29', null);

INSERT INTO `quejas` VALUES(1, 7, 26, 2, 23, 28,29, 1, 2, 11111111, 'Vanessa Morales', 'vanessa17grande@gmail.com', 'Oscar Lopez', 'ROE', '2020-10-19' , null, '23:07:06', 'QMS-1-2020', null) 
INSERT INTO `quejas` VALUES(2, 7, 26, 2, 23, 28,29, 2, 2, 11111111, 'Elio Raymundo', 'eraymundo@gmail.com', 'karla Lopez', 'ROE', '2020-19' , null, '23:07:06', 'QMS-1-2020', null) 