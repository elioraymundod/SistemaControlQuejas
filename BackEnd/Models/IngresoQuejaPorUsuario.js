const con = require('../Configs/cone');
module.exports={ 
    getPuntosAtencion(){
        return new Promise((resolve,reject)=>{
            con.query( 'SELECT pa.* FROM controlquejasdb.puntos_atencion as pa where codigo_estado = 5 ', (err,rows)=> {
                if(err) reject(err);
                else resolve(rows);
            })
        })
    },   
}

