
//SIGNUP
const signupForm = document.querySelector('#signup-form');

signupForm.addEventListener('submit',(e)=>
{
    e.preventDefault();
    const email = document.querySelector('#signup-email').value;
    const password = document.querySelector('#signup-password').value;


    auth
        .createUserWithEmailAndPassword(email,password)
        .then(userCredential =>
            {
                //borrar formulario
                signupForm.reset();
                $('#signupModal').modal('hide');
                console.log('signup');
        })  

});

//SIGNIN

const signinForm = document.querySelector('#login-form');

signinForm.addEventListener('submit', e => 
{
    e.preventDefault();
    const email = document.querySelector('#login-email').value;
    const password = document.querySelector('#login-password').value;
    auth
        .signInWithEmailAndPassword(email,password)
        .then(userCredential =>
            {
                //borrar formulario
                signupForm.reset();
                $('#signinModal').modal('hide');
                console.log('logeado');
        })  
});

const logout = document.querySelector('#logout');

logout.addEventListener('click', e =>
{
    e.preventDefault();
    auth.signOut().then(() =>
    {
        console.log('logout');
    })
});

//paquetes

const paquetesList = document.querySelector('.paquetes');

const x = document.querySelector('#paquetes');
//evntos
//si el usuario esta autenticado podra ver los datos
auth.onAuthStateChanged(user =>
{
    if(user)
    {
        console.log('bienvenidos')
        if (x.style.display === "none") {
            x.style.display = "block";}
    }
    else{
        console.log('chao');
        x.style.display = "none";
    }
});
