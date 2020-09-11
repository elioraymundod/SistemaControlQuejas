const con = require('../Configs/con');

module.exports={
    getAll(){
        return new Promise((resolve,reject)=>{
            con.query('SELECT pa.*, ca.nombre as nombre_region, caa.nombre as estado_punto_atencion ' + 
            'FROM controlquejasdb.puntos_atencion as pa ' +
            'inner join controlquejasdb.datos_catalogos as ca on pa.codigo_region = ca.codigo_dato_catalogo ' +
            'inner join controlquejasdb.datos_catalogos as caa on pa.codigo_estado = caa.codigo_dato_catalogo',(err,rows)=>{
                if(err) reject(err);
                else resolve(rows);
            })
        })
    },    
}