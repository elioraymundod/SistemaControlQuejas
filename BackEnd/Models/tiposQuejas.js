const con = require('../Configs/cone');

module.exports={
    getAll(){
        return new Promise((resolve,reject)=>{
            con.query('SELECT pa.*, caa.nombre as estado_tipo_queja ' +
                        'FROM controlquejasdb.tipos_quejas as pa ' +
                        'inner join controlquejasdb.datos_catalogos as caa on pa.codigo_estado = caa.codigo_dato_catalogo ',(err,rows)=>{
                if(err) reject(err);
                else resolve(rows);
            })
        })
    }, 

    insertTipoQueja(tipoQueja){
        return new Promise((resolve,reject)=>{
            let query='INSERT INTO controlquejasdb.tipos_quejas SET ?';
            con.query(query,[tipoQueja],(err,rows)=>{
                if(err) reject(err);
                else resolve (true);
            });
        });
    },

    getTipoQuejaBySiglas(siglas){
        return new Promise((resolve,reject)=>{
            con.query( 'SELECT * FROM controlquejasdb.tipos_quejas WHERE siglas = ? ', siglas, (err,rows)=> {
                if(err) reject(err);
                else resolve(rows);
            })
        })
    },  

    getQuejasByTipoQueja(tipoQueja){
        return new Promise((resolve,reject)=>{
            con.query( 'SELECT * FROM controlquejasdb.quejas WHERE codigo_tipo_queja = ? ', tipoQueja, (err,rows)=> {
                if(err) reject(err);
                else resolve(rows);
            })
        })
    },  

    updateTiposQuejas(tipoQueja){
        return new Promise((resolve,reject)=>{
            let query='UPDATE controlquejasdb.tipos_quejas SET codigo_estado = ?, descripcion_tipo_queja=?, fecha_modificacion = ? WHERE codigo_tipo_queja = ?';
            console.log(tipoQueja)
            con.query(query,[tipoQueja.codigo_estado,
                tipoQueja.descripcion_tipo_queja,
                tipoQueja.fecha_modificacion,
                tipoQueja.codigo_tipo_queja],(err,rows)=>{
                if(err) reject(err);
                else resolve (true);

            });
        });
    },

}