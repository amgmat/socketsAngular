// import { SERVER_PORT } from './global/environment';
import Server from './classes/server';
import router from './routes/router';
import express from 'express';
import cors from 'cors';

// import bodyParser from 'body-parser';

// const nombre = 'Alejandro';
// console.log(`Mi nombre es ${nombre}`);

const server = new Server();

// Body-parser - forma anterior, esta quedando obsoleto deprecated
// server.app.use(bodyParser.urlencoded({extended: true}));
// server.app.use(bodyParser.json());
server.app.use(express.urlencoded({extended:true}));
server.app.use(express.json());

// CORS
server.app.use(cors({origin:true, credentials: true}))

//Rutas de servicios
server.app.use('/', router);

server.start(()=> {
    console.log(`Servidor corriendo en el puerto ${ server.port}`);
    // console.log(`Servidor corriendo en el puerto ${ SERVER_PORT}`);
})