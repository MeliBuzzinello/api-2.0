import Product from '../models/Product.js'
import ProductDaoFactory from '../daos/DaoFactory.js'
import { asDto } from '../dtos/ProductosDto.js'

export default class ProductRepo {
    #dao

    constructor() {
        this.#dao = ProductDaoFactory.getDao()
    }

    async getAll() {
        const products = await this.#dao.getAll()
        //return products.map(p => new Product(p))
        return products
    }

    async getById(idBuscado) {
        const dto = await this.#dao.getById(idBuscado)
        return new Product(dto)
    }

    async add(productsNueva) {
        await this.#dao.save(asDto(productsNueva))
    }

    async removeById(idBuscado) {
        await this.#dao.deleteById(idBuscado)
    }

    async removeAll() {
        await this.#dao.deleteAll()
    }
}