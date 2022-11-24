import {
    getAllCarrito,
    postCarrito,
    deleteCarrito,
    getIdCarrito,
    postIdCarrito,
    deleteProdIdCarrito
} from '../services/carritoServices.js';

//--------------------------------------------
// router de todos lo carritos 

async function getAllCarController(req, res){
    const carrito = await getAllCarrito(); 
    res.json(carrito);
};

async function postCarController(req, res){
    const carrito = await postCarrito(req.body); 
    res.json(carrito);
};

async function deleteCarController(req, res){
    const carrito = await deleteCarrito(req.params.idCar); 
    res.json(carrito);
};

//--------------------------------------------
// router de productos en carrito

async function getIdCarController(req, res){
    const carrito = await getIdCarrito(req.params.idCar); 
    res.json(carrito);
};

async function postIdCarController(req, res){
    const carrito = await postIdCarrito(req); 
    res.json(carrito);
};

async function deleteProdIdCarController(req, res){
    const carrito = await deleteProdIdCarrito(req); 
    res.json(carrito);
};

export {
    getAllCarController,
    postCarController,
    deleteCarController,
    getIdCarController,
    postIdCarController,
    deleteProdIdCarController
}