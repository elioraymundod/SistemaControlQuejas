INSERT INTO `catalogos` VALUES (1, 'Regiones', 'Regiones para los puntos de atencion y para los usuarios', '2020-09-10'),
    							(2, 'Estados', 'Estados de los usuarios y de las quejas', '2020-09-10'),
                                (3, 'Etapas', 'Etapas de las quejas', '2020-09-10'),
                                (4, 'Cargos', 'Cargos de los usuarios', '2020-09-10'),
                                (5, 'Medios de ingreso de quejas', 'Medios por los cuales se puede ingresar una queja', '2020-09-10'),
                                (6, 'Tipos de creadores de quejas', 'Tipos que pueden crear una queja', '2020-09-10'),
                                (7, 'Estados externos', 'Estados externos de una queja', '2020-09-10'),
                                (8, 'Estados internos', 'Estados internos de una queja', '2020-09-10');

INSERT INTO `datos_catalogos` VALUES (1, 1, 'Region Central', 'Región Central', '2020-09-10'),
                                        (2, 1, 'Región Sur', 'Región Sur', '2020-09-10'),
                                        (3, 1, 'Región Nororiente', 'Región Nororiente', '2020-09-10'),
                                        (4, 1, 'Región Occidente', 'Región Occidente', '2020-09-10'),
                                        (5, 2, 'Activo', 'Activo', '2020-09-10'),
                                        (6, 2, 'Inactivo', 'Inactivo', '2020-09-10'),
                                        (7, 2, 'En análisis', 'En análisis', '2020-09-10'),
                                        (8, 2, 'Finalizada', 'Finalizada', '2020-09-10'),
                                        (9, 3, 'En análisis', 'En análisis', '2020-09-10'),
                                        (10, 3, 'No aplica', 'No aplica', '2020-09-10'),
                                        (11, 3, 'En seguimiento', 'En seguimiento', '2020-09-10'),
                                        (12, 3, 'No procedente', 'No procedente', '2020-09-10'),
                                        (13, 3, 'Reanálisis', 'Reanálisis', '2020-09-10'),
                                        (14, 4, 'Titular del punto de atención', 'Titular del punto de atención', '2020-09-10'),
                                        (15, 4, 'Suplente', 'Suplente', '2020-09-10'),
                                        (16, 4, 'Encargado', 'Encargado', '2020-09-10'),
                                        (17, 4, 'Jefe inmediato', 'Jefe inmediato', '2020-09-10'),
                                        (18, 4, 'Receptor de quejas', 'Receptor de quejas', '2020-09-10'),
                                        (19, 4, 'Centralizador de quejas', 'Centralizador de quejas', '2020-09-10'),
                                        (20, 5, 'Teléfono', 'Teléfono', '2020-09-10'),
                                        (21, 5, 'Correo', 'Correo', '2020-09-10'),
                                        (22, 5, 'Chat', 'Chat', '2020-09-10'),
                                        (23, 5, 'Presencial', 'Presencial', '2020-09-10'),
                                        (24, 5, 'Apliación móvil', 'Aplicación móvil', '2020-09-10'),
                                        (25, 5, 'Portal', 'Portal', '2020-09-10'),
                                        (26, 6, 'Cliente', 'Cliente', '2020-09-10'),
                                        (27, 6, 'Contribuyente', 'Contribuyente', '2020-09-10'),
                                        (28, 7, 'Presentada', 'Presentada', '2020-09-10'),
                                        (29, 8, 'Presentada', 'Presentada', '2020-09-10');

INSERT INTO `puntos_atencion` VALUES (1, 1, 5, 'Punto naranja', '2020-09-10');

INSERT INTO `usuarios_puntos_atencion` VALUES('12345678',5,19,1,'Vanessa Alexandra Grande Morales', 'Vane17', 'vanessa@gmail.com', '2020-09-15');
INSERT INTO `usuarios_puntos_atencion` VALUES('87654321',5,18,1,'Karla leticia Gonzales Gonzales', 'KarlaGG', 'karla@gmail.com', '2020-09-16');
