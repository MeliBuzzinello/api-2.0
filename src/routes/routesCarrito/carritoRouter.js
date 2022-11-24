import { Router } from 'express';
import {
        getAllCarController,
        postCarController,
        deleteCarController,
        getIdCarController,
        postIdCarController,
        deleteProdIdCarController
} from './controllers/carritoController.js';

const carritosRouter = new Router();

carritosRouter.get('/', getAllCarController);
carritosRouter.post('/', postCarController);
carritosRouter.delete('/:idCar', deleteCarController);

//--------------------------------------------
// router de productos en carrito

carritosRouter.get('/:idCar/productos', getIdCarController);
carritosRouter.post('/:idCar/productos', postIdCarController);
carritosRouter.delete('/:idCar/productos/:idProd', deleteProdIdCarController);

export default carritosRouter;