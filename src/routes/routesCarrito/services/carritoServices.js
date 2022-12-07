import CarritoRepo from '../repositories/repos/CarritoRepos.js';

const carritoRepo = new CarritoRepo()


async function getAllCarrito(){
    const result= await carritoRepo.getAll();
    return result;
};

async function getIdCarrito(id){
    const result= await carritoRepo.getById(id);
    return result;
};

async function postCarrito(req){
    // const product = new Product({req})
    const result= await carritoRepo.add(req); 
    return result;
};

async function putProduct(id, body){
    const result= await carritoRepo.updateById(id, body);
    return result;
};

async function deleteCarrito(pos){
    const result= await carritoRepo.deleteById(pos);
    return result;
};


// import { productosDao as productosApi } from '../daos/index.js';
// import CarritosDaoMariaDb from "../../../daos/carritos/CarritosDaoMariaDb.js";

// const carritosApi = new CarritosDaoMariaDb();


// async function getAllCarrito() {
//   const result = await carritosApi.listarAll();
//   return result;
// }

// async function postCarrito(req) {
//   const productos = req.body;
//   const result = await carritosApi.guardar(productos);
//   return result;
// }

// async function deleteCarrito(id) {
//   const result = await carritosApi.borrar(id);
//   return result;
// }

// async function getIdCarrito(idCar) {
//   const products = await carritosApi.listarAll();
//   const product = products.find((e) => e.idCar == idCar);
//   const carrito = products.filter((e) => e != product);
//   const result = await carrito.productos;
//   return result;
// }

// async function postIdCarrito(req) {
//   const carrito = carritosApi.listar(req.params.idCar);
//   carrito.productos = req.body;
//   const result = await carritosApi.guardar(carrito);
//   return result;
// }

// async function deleteProdIdCarrito(req) {
//     const { idCar } = req.params;
//     const { idProd } = req.params;
//     const carrito = await carritosApi.listar(idCar);
//     const prodcar = carrito.find(e => e.idProd == idProd)
//     const result = await carrito.filter(e => e != prodcar)
//     return result;
//   }

export {
  getAllCarrito,
  postCarrito,
  deleteCarrito,
  getIdCarrito,
  postIdCarrito,
  deleteProdIdCarrito
};
