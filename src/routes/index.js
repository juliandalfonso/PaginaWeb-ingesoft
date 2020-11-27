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

router.post('/new-contact', (req,res)=>
{
    const nuevoPaquete = 
    {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone
    };
db.ref('paquetes').push(nuevoPaquete);
res.send('received');
});

module.exports = router;
