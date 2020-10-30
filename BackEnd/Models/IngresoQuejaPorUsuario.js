const con = require('../Configs/cone');
module.exports={ 
    getAll(){
        return new Promise((resolve,reject)=>{
            con.query('SELECT pa.* FROM controlquejasdb.quejas as pa ',(err,rows)=>{
                if(err) reject(err);
                else resolve(rows);
            })
        })
    }, 

    getPuntosAtencion(){
        return new Promise((resolve,reject)=>{
            con.query( 'SELECT pa.* FROM controlquejasdb.puntos_atencion as pa where codigo_estado = 5 ', (err,rows)=> {
                if(err) reject(err);
                else resolve(rows);
            })
        })
    },   
    getTiposQuejas(){
        return new Promise((resolve,reject)=>{
            con.query( 'SELECT pa.* FROM controlquejasdb.tipos_quejas as pa where codigo_estado = 5 ', (err,rows)=> {
                if(err) reject(err);
                else resolve(rows);
            })
        })
    },   
    MediosIngresoDeQueja(){
        return new Promise((resolve,reject)=>{
            con.query( 'SELECT pa.* FROM controlquejasdb.datos_catalogos as pa where codigo_catalogo = 5 ', (err,rows)=> {
                if(err) reject(err);
                else resolve(rows);
            })
        })
    },   
    correlativo(){
        return new Promise((resolve,reject)=>{
            con.query( 'SELECT  q.* FROM controlquejasdb.quejas as q ORDER BY codigo_queja DESC ', (err,rows)=> {
                if(err) reject(err);
                else resolve(rows);
            })
        })
    },   
    InsertQuejas(enviarQueja){
        return new Promise((resolve,reject)=>{
            let query='INSERT INTO controlquejasdb.quejas SET ?';
            con.query(query,[enviarQueja],(err,rows)=>{
                if(err) reject(err);
                else resolve (true);
            });
        });
    },
}


