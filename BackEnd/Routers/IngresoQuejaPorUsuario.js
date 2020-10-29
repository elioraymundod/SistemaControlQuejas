const IngresoQuejaPorUsuario = require('../Models/IngresoQuejaPorUsuario');
const express = require('express');
const router = express.Router();

router.get('/IngresoQuejaPorUsuario/puntosAtencion',(req,res)=>{
    IngresoQuejaPorUsuario.getPuntosAtencion()
                    .then(IngresoQuejaPorUsuario=>{
                        res.status(200).send(IngresoQuejaPorUsuario);
                        console.log("puntos son"+res)
                    })
                    .catch(err=>{
                        console.error(err);
                        res.status(500).send({
                            mesage:'Error al obtener datos'
                        });
                    });

});


module.exports= router;