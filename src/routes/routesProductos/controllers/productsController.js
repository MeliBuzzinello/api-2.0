import {
    getAllProducts,
    getProductId,
    postProduct,
    putProduct,
    deleteProduct
} from '../services/productsServices.js';

async function getAllProductsController(req, res){
    const products = await getAllProducts(); 
    res.json(products);
};

async function getProductIdController(req, res){
    const products = await getProductId(req.params.id);
    res.json(products)
};

async function postProductController(req, res){
    const products = await postProduct(req.query);
    res.json(products)
};

async function putProductController(req, res){
    const id = req.params.id;
    const body = req.params.body;
    console.log(id)
    console.log(body)
    const products = await putProduct( id, body );
    res.json(products);
};

async function deleteProductController(req, res){
    const products = await deleteProduct(req.params.pos);
    res.json(products);
};

export {
    getAllProductsController,
    getProductIdController,
    postProductController,
    putProductController,
    deleteProductController
} 