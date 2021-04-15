import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io';
import http from 'http';
import * as socket from '../sokects/socket';

export default class Server {

    private static _instance: Server;

    public app:express.Application;
    public port: number;
    public io: socketIO.Server;
    private httpServer : http.Server;

    private constructor(){
        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server(this.app);
        // this.io = socketIO(this.httpServer);
        // this.io = require('socket.io')(this.httpServer);
        this.io = new socketIO.Server(this.httpServer, {cors: {origin: true ,credentials: true}});

        this.escucharSockets();
    }

    public static get instance(){
        return this._instance || (this._instance = new this());
    }

    private escucharSockets(){
        console.log('Escuchando conexiones -');

        this.io.on('connection', cliente =>{
            // console.log('Cliente conectado');
            // console.log(cliente.id);

            // cliente.on('disconnect', ()=>{
            //     console.log('Cliente Desconectado');
            // })

            // conectar cliente
            socket.conectarCliente(cliente);

            // configurar usuario
            socket.configurarUsuario(cliente, this.io);

            // Mensajes
            socket.mensaje(cliente, this.io);

            // desconectar
            socket.desconectar(cliente);

        })
    }

    // private escucharUsuario(){
    //     this.io.on('connect', cliente =>{
            
    //     })
    // }

    start(callback: Function){
    // start(callback: VoidFunction){
    // start(callback: any){
        // this.app.listen(this.port, callback());
        this.httpServer.listen(this.port, callback());
    }
}