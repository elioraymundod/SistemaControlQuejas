const UsuariosPuntosdeAtencion = require('../Models/UsuariosPuntosdeAtencion');
const express = require('express');
const router = express.Router();

router.get('/UsuariosPuntosdeAtencion',(req,res)=>{
    UsuariosPuntosdeAtencion.getAll()
                    .then(UsuariosPuntosdeAtencion =>{
                        res.status(200).send(UsuariosPuntosdeAtencion);
                    })
                    .catch(err=>{
                        console.error(err);
                        res.status(500).send({
                            mesage:'Error al obtener datos'
                        });
                    });

});
router.put('/UsuariosPuntosdeAtencion',(req,res)=>{
    UsuariosPuntosdeAtencion.updateUsuariosPuntosAtencion(req.body)
                    .then(UsuariosPuntosdeAtencion=>{
                        res.status(200).send({
                            mesage:'Se actualizaron los datos correctamente'
                        });
                    })
                    .catch(err=>{
                        console.error(err);
                        res.status(500).send({
                            mesage:'Error al actualizar datos'
                        });
                    });
});
router.get('/puntosAtencion/codigoRegion/:codigo_region',(req,res)=>{
    UsuariosPuntosdeAtencion.getPuntosAtencionByCodigo(req.params.codigo_region)
                    .then(UsuariosPuntosdeAtencion =>{
                        res.status(200).send(UsuariosPuntosdeAtencion);
                        console.log('Usuarios punto atencion es es: '+ UsuariosPuntosdeAtencion);
                        
                    })
                    .catch(err=>{
                        console.error(err);
                        res.status(500).send({
                            mesage:'Error al obtener datos'
                        });
                    });

});

router.get('/usuario/activo/otroPunto/:dpi_usuario',(req,res)=>{
    UsuariosPuntosdeAtencion.getUsuarioActivoEnOtroPunto(req.params.dpi_usuario)
                    .then(UsuariosPuntosdeAtencion =>{
                        res.status(200).send(UsuariosPuntosdeAtencion);
                    
                    })
                    .catch(err=>{
                        console.error(err);
                        res.status(500).send({
                            mesage:'Error al obtener datos'
                        });
                    });

});

router.get('/usuario/dpi/:dpi_usuario',(req,res)=>{
    UsuariosPuntosdeAtencion.getUsuariosByDpi(req.params.dpi_usuario)
                    .then(UsuariosPuntosdeAtencion =>{
                        res.status(200).send(UsuariosPuntosdeAtencion);
                        
                    })
                    .catch(err=>{
                        console.error(err);
                        res.status(500).send({
                            mesage:'Error al obtener datos'
                        });
                    });           

});


//codigo para guardar un usuariopuntoantencion
router.post('/UsuariosPuntosdeAtencion',(req,res)=>{
    UsuariosPuntosdeAtencion.insertUsuarioPuntoAtencion(req.body)
                    .then(UsuariosPuntosdeAtencion=>{
                        res.status(200).send({
                            mesage:'Se creo el usuario correctamente'
                        });
                    })
                    .catch(err=>{
                        console.error(err);
                        res.status(500).send({
                            mesage:'Error al crear el usuario'
                        });
                    });
});

module.exports= router;