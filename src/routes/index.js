//Solo se requiere el metodo router
const { Router } = require('express');

const router = Router();
const admin = require('firebase-admin');
const stripe = require('stripe')('sk_test_51HtJv1GUk0MOUD0Dpr4MvaGOOotkX6uDggSc4B1Hs6of52pCySQ3inBXNH5Zfj3ghLqsLLqf6POIsWRnDTFpeGhy00d2zC1w7u');

var serviceAccount = require("../../proyecto-ingesoft-firebase-adminsdk-fivf9-2d23d83f2b.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:'https://proyecto-ingesoft.firebaseio.com/'
});

const db = admin.database();

// STRIPE KEYS
const PUBLISHABLE_KEY = "pk_test_51HtJv1GUk0MOUD0DgxqMod01orwQI8oNzL6lf4sAePJZvB1k5jkhDrfJ5DLs7nonPx8VNjPIRb16JIeD0efgwA6e00umyRM0aQ"

const SECRET_KEY = "sk_test_51HtJv1GUk0MOUD0Dpr4MvaGOOotkX6uDggSc4B1Hs6of52pCySQ3inBXNH5Zfj3ghLqsLLqf6POIsWRnDTFpeGhy00d2zC1w7u"


router.get('/',(req,res)=>
{
    db.ref('paquetes').once('value', (snapshot)=>
    {
        const data = snapshot.val();
        res.render('index', {
            paquetes: data,
        });
    });
});

router.get('/admin',(req, res)=>
{
    db.ref('paquetes').once('value', (snapshot)=>
    {
        const data = snapshot.val();
        res.render('admin', {paquetes: data});
    });
});

router.get('/administrador',(req, res)=>
{
    res.render('administrador')
});

router.post('/administrador', (req,res)=>
{

      db.ref('administradores').once("value")
      .then(function(snapshot) {
         var name = snapshot.val(); // {first:"Ada",last:"Lovelace"}
        // console.log(name);
        for (var i in name) {
            if(name[i].adminemail == req.body.adminemail )
            {
                if(name[i].password == req.body.password)
                {
                    db.ref('paquetes').once('value', (snapshot)=>
                    {
                        const data = snapshot.val();
                        res.render('admin', {paquetes: data});
                    });
                    
                }
            }
        }
      });
      

});



router.post('/checkout', async(req,res)=>
{
    //creo un comprador con su email y token
    const customer = await stripe.customers.create(
        {
            email: req.body.stripeEmail,
            source: req.body.stripeToken
        }
    );

    //creo una compra y la cargo a stripe
    const charge = await stripe.charges.create({
        amount:'3000',
        currency: 'usd',
        customer: customer.id,
        description: 'Paquete turístico'
    });
    console.log(charge.id);
    //final show

    res.render('download');
});

router.post('/new-paquete', (req,res)=>
{
    const nuevoPaquete =
    {
        origen: req.body.origen,
        destino: req.body.destino,
        fechaSalida: req.body.fechaSalida,
        fechaLlegada: req.body.fechaLlegada,
        hotel: req.body.hotel,
        detalles: req.body.detalles,
        urlimg: req.body.urlimg,
        precio: req.body.precio
    };
db.ref('paquetes').push(nuevoPaquete);
res.redirect('/admin');
});


router.get('/delete-paquete/:id',(req,res)=>{
    db.ref('paquetes/'+req.params.id).remove();
    res.redirect('/admin');
});

router.get('/edit-paquete/:id',(req,res)=>{
    res.redirect('/admin');
});


module.exports = router;
