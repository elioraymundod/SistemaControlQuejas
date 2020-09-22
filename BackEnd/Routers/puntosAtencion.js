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

router.put('/puntosAtencion',(req,res)=>{
    puntosAtencion.updatePuntosAtencion(req.body)
                    .then(puntosAtencion=>{
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

router.post('/puntosAtencion',(req,res)=>{
    puntosAtencion.insertPuntoAtencion(req.body)
                    .then(puntosAtencion=>{
                        res.status(200).send({
                            mesage:'Se creo el punto de atencion correctamente'
                        });
                    })
                    .catch(err=>{
                        console.error(err);
                        res.status(500).send({
                            mesage:'Error al crear un punto de atencion'
                        });
                    });
});

router.get('/puntosAtencion/codigoRegion/:codigo_region',(req,res)=>{
    puntosAtencion.getPuntosAtencionByCodigo(req.params.codigo_region)
                    .then(puntosAtencion =>{
                        res.status(200).send(puntosAtencion);
                        console.log('Puntos atencion es es: '+ puntosAtencion);
                        
                    })
                    .catch(err=>{
                        console.error(err);
                        res.status(500).send({
                            mesage:'Error al obtener datos'
                        });
                    });

});

module.exports= router;