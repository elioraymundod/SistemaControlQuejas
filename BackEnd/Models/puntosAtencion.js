const con = require('../Configs/cone');

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
    
    updatePuntosAtencion(puntoAtencion){
        return new Promise((resolve,reject)=>{
            let query='UPDATE controlquejasdb.puntos_atencion SET codigo_estado = ?, nombre_punto_atencion=? WHERE codigo_punto_atencion = ?';
            con.query(query,[puntoAtencion.codigo_estado,
                puntoAtencion.nombre_punto_atencion,
                puntoAtencion.codigo_punto_atencion],(err,rows)=>{
                if(err) reject(err);
                else resolve (true);

            });
        });
    },

    insertPuntoAtencion(puntoAtencion){
        return new Promise((resolve,reject)=>{
            let query='INSERT INTO controlquejasdb.puntos_atencion SET ?';
            con.query(query,[puntoAtencion],(err,rows)=>{
                if(err) reject(err);
                else resolve (true);
            });
        });
    },

    getPuntosAtencionByCodigo(codigo_region){
        return new Promise((resolve,reject)=>{
            con.query( 'SELECT * FROM controlquejasdb.puntos_atencion WHERE codigo_estado = 5 and codigo_region = ? ', codigo_region, (err,rows)=> {
                
                if(err) reject(err);
                else resolve(rows);
            })
        })
    },   
}