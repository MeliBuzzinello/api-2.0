import Carritos from '../models/Carritos.js'
import CarritoDaoFactory from '../daos/DaoFactory.js'
import { asDto } from '../dtos/CarritosDto.js'

export default class CarritoRepo {
    #dao

    constructor() {
        this.#dao = CarritoDaoFactory.getDao()
    }

    async getAll() {
        const carrito = await this.#dao.getAll()
        //return products.map(p => new Product(p))
        return carrito
    }

    async getById(idBuscado) {
        const dto = await this.#dao.getById(idBuscado)
        return new Carritos(dto)
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