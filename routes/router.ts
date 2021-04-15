import {Router,Request,Response} from 'express';
import Server from '../classes/server';


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
    })
});

export default router;