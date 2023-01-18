import { optionsMDB } from "./options/mariaDB.js";
import { optionsSQL3 } from "./options/SQLite3.js";
import ClientSql from "./sqlMDB.js";

const sqlMDB = new ClientSql(optionsMDB)

const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const {engine} = require('express-handlebars')


class Contenedor {
    constructor (nombre, precio, url){
        this.nombre = nombre;
        this.precio = precio;
        this.url = url;
    }
}

let productos = [
    {nombre: 'Harina', codigo: '001', precio: 80.00, stock: 50},
    {nombre: 'Arroz', codigo: '002', precio: 160.00, stock: 25},
    {nombre: 'Caramelo', codigo: '003', precio: 50.00, stock: 80},
    {nombre: 'Leche', codigo: '004', precio: 250.00, stock: 46},
    {nombre: 'Queso', codigo: '005', precio: 1300.00, stock: 15}
]
let messages = [
    {author: "Juan", time: new Date() ,text: "Hola!"}
]

//Configuracion Handlebars
app.engine('handlebars', engine())
app.use(express.urlencoded({extended: true}))
app.set('views', './views')
app.set('view engine', 'handlebars')


app.use(express.static('./public'))

app.post('/productos', (req, res) => {
    productos.push(req.body)
    console.log(productos);
    res.redirect('/')
})

app.get('/', (req, res) => {
    res.render('formulario', {productos})
})



io.on('connection', (socket) => {
    console.log('Un cliente se ha conectado');
    socket.emit('messages', messages);

    socket.on('new-message', data => {
        messages.push(data);
        io.sockets.emit('messages', messages);
    });
});

const PORT = 8080

const srv = server.listen(PORT, () => console.log(`Servidor http con WebSocket escuchando el puerto ${srv.address().port}`))
srv.on('error', error => console.log(`Error en el servidor ${error}`))