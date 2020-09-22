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
router.get('/Regiones/CodigoRegion/:Codigo_Region',(req,res)=>{
    UsuariosPuntosdeAtencion.getPuntosAtencionByCodigo(req.params.Codigo_Region)
                    .then(UsuariosPuntosdeAtencion =>{
                        res.status(200).send(UsuariosPuntosdeAtencion);
                        console.log('el Res es: '+ res);
                        
                    })
                    .catch(err=>{
                        console.error(err);
                        res.status(500).send({
                            mesage:'Error al obtener datos'
                        });
                    });

});


module.exports= router;