const IngresoQuejaPorUsuario = require('../Models/IngresoQuejaPorUsuario');
const express = require('express');
const router = express.Router();


router.get('/quejas',(req,res)=>{
    IngresoQuejaPorUsuario.getAll()
                    .then(IngresoQuejaPorUsuario=>{
                        res.status(200).send(IngresoQuejaPorUsuario);
                    })
                    .catch(err=>{
                        console.error(err);
                        res.status(500).send({
                            mesage:'Error al obtener datos'
                        });
                    });

});

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

router.get('/IngresoQuejaPorUsuario/quejas',(req,res)=>{
    IngresoQuejaPorUsuario.getTiposQuejas()
                    .then(IngresoQuejaPorUsuario=>{
                        res.status(200).send(IngresoQuejaPorUsuario);
                        console.log("tipos jas son"+res)
                    })
                    .catch(err=>{
                        console.error(err);
                        res.status(500).send({
                            mesage:'Error al obtener datos'
                        });
                    });

});
router.get('/IngresoQuejaPorUsuario/medios',(req,res)=>{
    IngresoQuejaPorUsuario.MediosIngresoDeQueja()
                    .then(IngresoQuejaPorUsuario=>{
                        res.status(200).send(IngresoQuejaPorUsuario);
                        console.log("tipos medios son"+ res)
                    })
                    .catch(err=>{
                        console.error(err);
                        res.status(500).send({
                            mesage:'Error al obtener datos'
                        });
                    });

});
router.get('/IngresoQuejaPorUsuario/correlativo',(req,res)=>{
    IngresoQuejaPorUsuario.correlativo()
                    .then(IngresoQuejaPorUsuario=>{
                        res.status(200).send(IngresoQuejaPorUsuario);
                        console.log("el correlativo es: "+ res)
                    })
                    .catch(err=>{
                        console.error(err);
                        res.status(500).send({
                            mesage:'Error al obtener datos'
                        });
                    });

});
router.post('/IngresoQuejaPorUsuario',(req,res)=>{
    IngresoQuejaPorUsuario.InsertQuejas(req.body)
                    .then(IngresoQuejaPorUsuario=>{
                        res.status(200).send({
                            mesage:' se ingresó exitosamente su queja'
                        });
                    })
                    .catch(err=>{
                        console.error(err);
                        res.status(500).send({
                            mesage:'Error al crear la queja'
                        });
                    });
});


module.exports= router;