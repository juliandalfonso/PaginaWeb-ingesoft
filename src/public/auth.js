
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
        .createUserWithEmailAndPassword(email,password)
        .then(userCredential =>
            {
                //borrar formulario
                signupForm.reset();
                $('#signupModal').modal('hide');
                console.log('logeado');
        })  
});

const logout = document.querySelector('#logout');

logout.addEventListener('click', e =>
{
    e.preventDefault();
    auth.signOut().then(() =>
    {
        console.log('logout')
    })
})