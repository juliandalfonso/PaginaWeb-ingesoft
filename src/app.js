// app.js es el Archivo que arranca la aplicacion

// requiero el modulo express
const express = require('express');

const morgan = require('morgan');

const exphbs = require('express-handlebars');

const path = require('path');



// ejecuto el modulo express
const app = express();

// SETTINGS-----------------------------------------------------------------------------------------


// Establecemos el puerto predefinido o el puerto 3000
app.set('port', process.env.PORT || 3000);

//Establecemos la carpeta de las vistas
app.set('views', path.join(__dirname, 'views'));

//Establecemos el motor de plantillas
app.engine('.hbs', exphbs(
    {
        defaultLayout: 'main',
        layoutsDir: path.join(app.get('views'), 'layouts'),
        partialsDir: path.join(app.get('views'), 'partials'),
        extname: '.hbs'
    }
));

app.set('view engine', '.hbs');


// MIDDLEWARES-----------------------------------------------------------------------------------------

app.use(morgan('dev'));
//cuando se acepta el pago stripe envia datos al servidor 
app.use(express.urlencoded({extended: false}));

app.use(express.json());


// ROUTES-----------------------------------------------------------------------------------------
app.use(require('./routes/index'));

// STATIC FILES-----------------------------------------------------------------------------------------

//este método me permite decirle al back donde está la carpeta public
app.use(express.static(path.join(__dirname, 'public')));




// exporto el modulo-----------------------------------------------------------------------------------------
module.exports = app;