import { Socket } from "socket.io";
import socketIO from 'socket.io';
import { UsuarioLista } from '../classes/usuarios-lista';
import { Usuario } from "../classes/usuario";

export const usuariosConectados = new UsuarioLista();

export const conectarCliente = (cliente: Socket, io: socketIO.Server)=>{
    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);

    
}

export  const desconectar =(cliente: Socket, io: socketIO.Server)=>{
    cliente.on('disconnect', ()=>{
        console.log('Cliente desconectado');

        usuariosConectados.borrarUsuario(cliente.id);

        io.emit('usuarios-activos', usuariosConectados.getLista());
    });
}

// Escuchar mensajes
export const mensaje = (cliente: Socket, io: socketIO.Server)=>{
    cliente.on('mensaje', (payload: {de: string, cuerpo: string}) =>{
        console.log('Mensaje recibido', payload);

        io.emit('mensaje-nuevo',payload);
    });
}
// Configurar usuario
export const configurarUsuario = (cliente: Socket, io: socketIO.Server)=>{
    cliente.on('configurar-usuario', (payload: {nombre: string}, callback: Function) =>{
        // console.log('Configurando Usuario', payload.nombre);

        usuariosConectados.actualizarNombre(cliente.id, payload.nombre);
        setTimeout(()=>{
            io.emit('usuarios-activos', usuariosConectados.getLista());

        },10);

        callback({
            ok:true,
            mensaje: `Usuario ${payload.nombre}, configurado`
        });

        // io.emit('mensaje-nuevo',payload);
    });
}

// obtener usuarios

export const ObtenerUsuario = (cliente: Socket, io: socketIO.Server)=>{
    cliente.on('obtener usuarios',() =>{

        io.to(cliente.id).emit('usuarios-activos', usuariosConectados.getLista());
    });
}