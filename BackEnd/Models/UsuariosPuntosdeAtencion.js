const con = require('../Configs/cone');

module.exports={
    getAll(){
        return new Promise((resolve,reject)=>{
            con.query('SELECT upa.* FROM  controlquejasdb.usuarios_puntos_atencion as upa',(err,rows)=> {
                if(err) reject(err);
                else resolve(rows);
            })
        })
    },    
}