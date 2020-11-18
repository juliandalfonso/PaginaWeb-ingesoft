//creando el backend
const app = require('./app');

//ponemos a correr la página en el puerto 3000
app.listen(app.get('port'));
console.log('server on port ', app.get('port'));