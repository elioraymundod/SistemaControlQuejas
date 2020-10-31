const IngresoQuejaPorContribuyente = require('../Models/IngresoQuejaPorContribuyente');
const express = require('express');
const router = express.Router();

router.get('/quejass',(req,res)=>{
    IngresoQuejaPorContribuyente.getAll()
                    .then(IngresoQuejaPorContribuyente=>{
                        res.status(200).send(IngresoQuejaPorContribuyente);
                    })
                    .catch(err=>{
                        console.error(err);
                        res.status(500).send({
                            mesage:'Error al obtener datos'
                        });
                    });

});

router.get('/IngresoQuejaPorContribuyente/puntosAtencion',(req,res)=>{
    IngresoQuejaPorContribuyente.getPuntosAtencion()
                    .then(IngresoQuejaPorContribuyente=>{
                        res.status(200).send(IngresoQuejaPorContribuyente);
                        console.log("puntos son"+res)
                    })
                    .catch(err=>{
                        console.error(err);
                        res.status(500).send({
                            mesage:'Error al obtener datos'
                        });
                    });

});

router.get('/IngresoQuejaPorContribuyente/quejas',(req,res)=>{
    IngresoQuejaPorContribuyente.getTiposQuejas()
                    .then(IngresoQuejaPorContribuyente=>{
                        res.status(200).send(IngresoQuejaPorContribuyente);
                        console.log("tipos jas son"+res)
                    })
                    .catch(err=>{
                        console.error(err);
                        res.status(500).send({
                            mesage:'Error al obtener datos'
                        });
                    });

});

router.get('/IngresoQuejaPorContribuyente/medios',(req,res)=>{
    IngresoQuejaPorContribuyente.MediosIngresoDeQueja()
                    .then(IngresoQuejaPorContribuyente=>{
                        res.status(200).send(IngresoQuejaPorContribuyente);
                        console.log("tipos medios son"+ res)
                    })
                    .catch(err=>{
                        console.error(err);
                        res.status(500).send({
                            mesage:'Error al obtener datos'
                        });
                    });

});

router.get('/IngresoQuejaPorContribuyente/correlativo',(req,res)=>{
    IngresoQuejaPorContribuyente.correlativo()
                    .then(IngresoQuejaPorContribuyente=>{
                        res.status(200).send(IngresoQuejaPorContribuyente);
                        console.log("el correlativo es: "+ res)
                    })
                    .catch(err=>{
                        console.error(err);
                        res.status(500).send({
                            mesage:'Error al obtener datos'
                        });
                    });

});

router.post('IngresoQuejaPorContribuyente',(req,res)=>{
    IngresoQuejaPorContribuyente.InsertQuejas(req.body)
                    .then(IngresoQuejaPorContribuyente=>{
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