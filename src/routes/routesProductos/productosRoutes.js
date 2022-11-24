import { Router } from 'express';
import {
    getAllProductsController,
    getProductIdController,
    postProductController,
    putProductController,
    deleteProductController
} from './controllers/productsController.js'

const productosRouter = new Router()

productosRouter.get('/', getAllProductsController);
productosRouter.get('/:id', getProductIdController);
productosRouter.post('/', postProductController);
productosRouter.put('/:id', putProductController);
productosRouter.delete('/:pos', deleteProductController);

export default productosRouter;