const con = require('../Configs/cone');

module.exports={
    getAll(){
        return new Promise((resolve,reject)=>{
            con.query('SELECT upa.*, ca.nombre as nombre_region, caa.nombre as estado_punto_atencion, caaa.nombre_punto_atencion as nombre_punto '+
            'FROM controlquejasdb.usuarios_puntos_atencion as upa '+
            'inner join controlquejasdb.datos_catalogos as ca on upa.codigo_region = ca.codigo_dato_catalogo '+
            'inner join controlquejasdb.datos_catalogos as caa on upa.codigo_estado = caa.codigo_dato_catalogo '+
            'inner join controlquejasdb.puntos_atencion as caaa on upa.codigo_punto_atencion = caaa.codigo_punto_atencion',(err,rows)=> {
                if(err) reject(err);
                else resolve(rows);
            })
        })
    },    
}