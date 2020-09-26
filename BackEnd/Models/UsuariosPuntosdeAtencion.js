const con = require('../Configs/cone');

module.exports={
    getAll(){
        return new Promise((resolve,reject)=>{
            con.query( 'select upa.*, pa.nombre_punto_atencion as nombre_punto_atencion, us.nombre as nombre_usuario, ' +
            'ca.descripcion as nombre_cargo, es.descripcion as nombre_estado ' + 
            'from controlquejasdb.usuarios_puntos_atencion as upa ' +
            'inner join controlquejasdb.puntos_atencion as pa on upa.codigo_punto = pa.codigo_punto_atencion ' +
            'inner join controlquejasdb.usuarios as us on upa.dpi_usuario = us.dpi_usuario ' +
            'inner join controlquejasdb.datos_catalogos as ca on upa.codigo_cargo = ca.codigo_dato_catalogo ' +
            'inner join controlquejasdb.datos_catalogos as es on upa.codigo_estado = es.codigo_dato_catalogo',(err,rows)=> {
                if(err) reject(err);
                else resolve(rows);
            })
        })
    },    
    updateUsuariosPuntosAtencion(UsuarioPuntoAtencion){
        return new Promise((resolve,reject)=>{
            let query='UPDATE controlquejasdb.usuarios_puntos_atencion SET correo_electronico= ?, codigo_estado = ?, codigo_cargo= ? WHERE codigo_usuario_punto = ?';
            con.query(query,[UsuarioPuntoAtencion.correo_electronico,
                UsuarioPuntoAtencion.codigo_estado,
                UsuarioPuntoAtencion.codigo_cargo,
                UsuarioPuntoAtencion.codigo_usuario_punto],(err,rows)=>{
                if(err) reject(err);
                else resolve (true);

            });
        });
    },

   getPuntosAtencionByCodigo(codigo_region){
        return new Promise((resolve,reject)=>{
            let query='SELECT * FROM controlquejasdb.puntos_atencion WHERE codigo_estado = 5 and codigo_region=?';
            con.query( query,[codigo_region],(err,rows)=> {
                
                if(err) reject(err);
                else resolve(rows);
            })
        })
    },  
    
    getUsuariosByDpi(dpi_usuario){
        return new Promise((resolve,reject)=>{
            let query='select * from controlquejasdb.usuarios where dpi_usuario =?';
            con.query( query,[dpi_usuario],(err,rows)=> {
                if(err) reject(err);
                else resolve(rows);
            })
        })
    },  

    getUsuarioActivoEnOtroPunto(dpi_usuario){
        return new Promise((resolve,reject)=>{
            let query='select us.*, cat.nombre_punto_atencion as nombre_punto ' +
            'from controlquejasdb.usuarios_puntos_atencion as us ' +
            'inner join controlquejasdb.puntos_atencion as cat on us.codigo_punto = cat.codigo_punto_atencion ' +
            'where dpi_usuario = ? and (codigo_cargo = 14 or codigo_cargo = 15 or codigo_cargo = 16 or codigo_cargo = 18 or codigo_cargo = 19)';
            con.query( query,[dpi_usuario],(err,rows)=> {
                if(err) reject(err);
                else resolve(rows);
            })
        })
    },  
    getUsuarioActivoEnOtroPunto(dpi_usuario){
        return new Promise((resolve,reject)=>{
            let query='select us.*, cat.nombre_punto_atencion as nombre_punto ' +
            'from controlquejasdb.usuarios_puntos_atencion as us ' +
            'inner join controlquejasdb.puntos_atencion as cat on us.codigo_punto = cat.codigo_punto_atencion ' +
            'where dpi_usuario = ? and (codigo_cargo = 14 or codigo_cargo = 15 or codigo_cargo = 16 or codigo_cargo = 18 or codigo_cargo = 19)';
            con.query( query,[dpi_usuario],(err,rows)=> {
                if(err) reject(err);
                else resolve(rows);
            })
        })
    },  
   
    insertUsuarioPuntoAtencion(UsuarioPuntoAtencion){
        return new Promise((resolve,reject)=>{
            let query='INSERT INTO controlquejasdb.usuarios_puntos_atencion SET ?';
            con.query(query,[UsuarioPuntoAtencion],(err,rows)=>{
                if(err) reject(err);
                else resolve (true);
            });
        });
    },
}
