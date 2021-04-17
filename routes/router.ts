import {Router,Request,Response} from 'express';
import Server from '../classes/server';
import { Socket } from 'socket.io';
import { usuariosConectados } from '../sokects/socket';


const router = Router();
// export const router = Router();

router.get('/mensajes', (req:Request, res: Response)=>{
    res.json({
        ok:true,
        mensaje:'Todo esta bien'
    })
});
router.post('/mensajes', (req:Request, res: Response)=>{

    const cuerpo  = req.body.cuerpo;
    const de = req.body.de;

    const payload = {
        de,
        cuerpo
    };

    const server = Server.instance;
    server.io.emit('mensaje-nuevo', payload);

    res.json({
        ok:true,
        // mensaje:'POST - LISTO'
        cuerpo,
        de
    })
});

router.post('/mensajes/:id', (req:Request, res: Response)=>{

    const cuerpo  = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;

    const payload = {
        de,
        cuerpo
    }

    const server = Server.instance;
    // Enviara a un solo usuario
    server.io.in(id).emit('mensaje-privado', payload);
    //Enviará a todo el mundo  
    // server.io.emit('mensaje-privado', payload);

    res.json({
        ok:true,
        // mensaje:'POST - LISTO'
        cuerpo,
        de,
        id 
    });
});

// Servicio para obtener todos los IDS de los usuarios
router.get('/usuarios', (req: Request, res: Response) =>{
    const server = Server.instance;

    server.io.allSockets().then((clientes)=>{
        res.json({
            ok: true,
            clientes:Array.from(clientes)
        });
    }).catch((err) =>{
        res.json({
            ok:false,
            err
        })
    })
});

router.get('/usuarios/detalle', (req: Request, res: Response) =>{
res.json({
    ok: true,
    clientes: usuariosConectados.getLista()
});
});

export default router;