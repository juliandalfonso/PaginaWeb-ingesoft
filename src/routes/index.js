const { Router } = require('express');

const router = Router();
const admin = require('firebase-admin');

var serviceAccount = require("../../proyecto-ingesoft-firebase-adminsdk-fivf9-2d23d83f2b.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:'https://proyecto-ingesoft.firebaseio.com/'
});

const db = admin.database();


router.get('/',(req, res)=>
{
    db.ref('paquetes').once('value', (snapshot)=>
    {
        const data = snapshot.val();
        res.render('index', {paquetes: data});
    });
});

router.post('/new-paquete', (req,res)=>
{
    const nuevoPaquete = 
    {
        origen: req.body.origen,
        destino: req.body.destino,
        fechaSalida: req.body.fechaSalida,
        fechaLlegada: req.body.fechaSalida,
        hotel: req.body.hotel,
        detalles: req.body.detalles,
        urlimg: req.body.urlimg
    };
db.ref('paquetes').push(nuevoPaquete);
res.redirect('/');
});


router.get('/delete-paquete/:id',(req,res)=>{
    db.ref('paquetes/'+req.params.id).remove();
    res.redirect('/');
});

router.get('/edit-paquete/:id',(req,res)=>{
    db.ref('paquetes/'+req.params.id).remove();
    res.redirect('/');
});
module.exports = router;
