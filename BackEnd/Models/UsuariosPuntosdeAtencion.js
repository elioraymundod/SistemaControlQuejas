const con = require('../Configs/cone');

module.exports={
    getAll(){
        return new Promise((resolve,reject)=>{
            con.query( 'SELECT upa.*, ca.nombre as nombre_region, caaaa.nombre as cargo_usuario, caa.nombre as estado_punto_atencion, caaa.nombre_punto_atencion as nombre_punto, pa.nombre_punto_atencion '+
              'FROM controlquejasdb.usuarios_puntos_atencion as upa '+ 
                'inner join controlquejasdb.datos_catalogos as ca on upa.codigo_region = ca.codigo_dato_catalogo '+
                'inner join controlquejasdb.datos_catalogos as caaaa on upa.codigo_cargo = caaaa.codigo_dato_catalogo '+
                'inner join controlquejasdb.datos_catalogos as caa on upa.codigo_estado = caa.codigo_dato_catalogo '+
                'inner join controlquejasdb.puntos_atencion as caaa on upa.codigo_punto_atencion = caaa.codigo_punto_atencion '+
                'inner join controlquejasdb.puntos_atencion as pa on upa.codigo_region = pa.codigo_punto_atencion',(err,rows)=> {
                if(err) reject(err);
                else resolve(rows);
            })
        })
    },    
    updateUsuariosPuntosAtencion(UsuarioPuntoAtencion){
        return new Promise((resolve,reject)=>{
            let query='UPDATE controlquejasdb.usuarios_puntos_atencion SET correo_electronico= ?, codigo_estado = ?, codigo_cargo= ? WHERE dpi_usuario = ?';
            con.query(query,[UsuarioPuntoAtencion.correo_electronico,
                UsuarioPuntoAtencion.codigo_estado,
                UsuarioPuntoAtencion.codigo_cargo,
                UsuarioPuntoAtencion.dpi_usuario],(err,rows)=>{
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


        
    }
