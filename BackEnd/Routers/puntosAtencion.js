const puntosAtencion = require('../Models/puntosAtencion');
const express = require('express');
const router = express.Router();

router.get('/puntosAtencion',(req,res)=>{
    puntosAtencion.getAll()
                    .then(puntosAtencion=>{
                        res.status(200).send(puntosAtencion);
                    })
                    .catch(err=>{
                        console.error(err);
                        res.status(500).send({
                            mesage:'Error al obtener datos'
                        });
                    });

});

module.exports= router;