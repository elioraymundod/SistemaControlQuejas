const express = require('express');
const morgan = require('morgan');
const cors = require('cors');


const app = express();

const port=3000;

//Settings
app.set('port', process.env.PORT || port);

//Middleware

app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));

app.use(cors());

app.use(morgan('dev'));
//Router
app.use(require('./Routers/puntosAtencion'));
app.use(require('./Routers/UsuariosPuntosdeAtencion'));
app.use(require('./Routers/IngresoQuejaPorUsuario'));
app.use(require('./Routers/auth'));
app.use(require('./Routers/envioCorreo'));


app.listen(app.get('port'),()=>{
    console.log(`Server rum on port ${app.get('port')}`)
});
