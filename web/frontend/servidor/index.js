const app = require('express')();

const options = {
    cors: true,
    origins: ["*"]
}

const server = require('http').createServer(app);
const io = require('socket.io')(server, options);
const port = process.env.PORT || 4000;

io.on('connection', (socket) => {

    console.log('usuario conectado');

    socket.on('nuevo_mensaje', (mensaje) => {
        console.log(mensaje);
        io.emit('nuevo_mensaje', mensaje);
    });

});
server.listen(port, () => {
    console.log(`Servidor a la escucha en el puerto: ${port}`);
});