const tiposQuejas = require('../Models/tiposQuejas');
const express = require('express');
const router = express.Router();

router.get('/tiposQuejas',(req,res)=>{
    tiposQuejas.getAll()
                    .then(tiposQuejas=>{
                        res.status(200).send(tiposQuejas);
                    })
                    .catch(err=>{
                        console.error(err);
                        res.status(500).send({
                            mesage:'Error al obtener datos'
                        });
                    });

});

router.post('/tiposQuejas',(req,res)=>{
    tiposQuejas.insertTipoQueja(req.body)
                    .then(tiposQuejas=>{
                        res.status(200).send({
                            mesage:'Se creo el tipo queja correctamente'
                        });
                    })
                    .catch(err=>{
                        console.error(err);
                        res.status(500).send({
                            mesage:'Error al crear un tipo de queja'
                        });
                    });
});

router.get('/tiposQuejas/siglas/:siglas',(req,res)=>{
    tiposQuejas.getTipoQuejaBySiglas(req.params.siglas)
                    .then(tiposQuejas =>{
                        res.status(200).send(tiposQuejas);
                    })
                    .catch(err=>{
                        console.error(err);
                        res.status(500).send({
                            mesage:'Error al obtener datos'
                        });
                    });

});

router.get('/tiposQuejas/tipoQueja/:tipoQueja',(req,res)=>{
    tiposQuejas.getQuejasByTipoQueja(req.params.siglas)
                    .then(tiposQuejas =>{
                        res.status(200).send(tiposQuejas);
                    })
                    .catch(err=>{
                        console.error(err);
                        res.status(500).send({
                            mesage:'Error al obtener datos'
                        });
                    });

});

router.put('/tiposQuejas',(req,res)=>{
    tiposQuejas.updateTiposQuejas(req.body)
                    .then(tiposQuejas=>{
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

module.exports= router;