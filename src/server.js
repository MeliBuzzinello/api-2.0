import express from 'express';
import carritosRouter from './routes/routesCarrito/carritoRouter.js';
import productosRouter from './routes/routesProductos/productosRoutes.js';
import userRouter from './routes/userRouter.js';

// import {
//     productosDao as productosApi,
//     carritosDao as carritosApi
// } from './daos/index.js';

//--------------------------------------------
// instancio servidor y persistencia

const app = express()

//--------------------------------------------

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'));

//--------------------------------------------
// configuro el servidor

app.use('/api/productos', productosRouter)
app.use('/api/carritos', carritosRouter)
app.use('/api/use', userRouter)

export default app
