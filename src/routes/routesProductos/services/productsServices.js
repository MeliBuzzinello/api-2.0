import Product from '../repositories/models/Product.js';
import ProductRepo from '../repositories/repos/ProductRepos.js';

const productRepo = new ProductRepo()


async function getAllProducts(){
    const result= await productRepo.getAll();
    return result;
};

async function getProductId(id){
    const result= await productRepo.getById(id);
    return result;
};

async function postProduct(req){
    // const product = new Product({req})
    const result= await productRepo.add(req); 
    return result;
};

async function putProduct(id, body){
    const result= await productRepo.updateById(id, body);
    return result;
};

async function deleteProduct(pos){
    const result= await productRepo.deleteById(pos);
    return result;
};



// import { productosDao as productosApi } from '../daos/index.js';
// import ProductosDaoMariaDb from '../../../daos/productos/ProductosDaoMariaDb.js';
// const productosApi = new ProductosDaoMariaDb();

// async function getAllProducts(){
//     const result= await productosApi.listarAll();
//     return result;
// };

// async function getProductId(id){
//     const result= await productosApi.listar(id);
//     return result;
// };

// async function postProduct(req){
//     const result= await productosApi.guardar(req); 
//     return result;
// };

// async function putProduct(id, body){
//     const result= await productosApi.actualizar(id, body);
//     return result;
// };

// async function deleteProduct(pos){
//     const result= await productosApi.borrar(pos);
//     return result;
// };

export {
    getAllProducts,
    getProductId,
    postProduct,
    putProduct,
    deleteProduct
}