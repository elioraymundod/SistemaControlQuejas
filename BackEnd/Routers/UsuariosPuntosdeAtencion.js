const UsuariosPuntosdeAtencion = require('../Models/UsuariosPuntosdeAtencion');
const express = require('express');
const router = express.Router();

router.get('/UsuariosPuntosdeAtencion',(req,res)=>{
    UsuariosPuntosdeAtencion.getAll()
                    .then(UsuariosPuntosdeAtencion=>{
                        res.status(200).send(UsuariosPuntosdeAtencion);
                    })
                    .catch(err=>{
                        console.error(err);
                        res.status(500).send({
                            mesage:'Error al obtener datos'
                        });
                    });

});

module.exports= router;