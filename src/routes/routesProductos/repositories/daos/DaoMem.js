import { asDto } from '../dtos/ProductosDto.js'

export default class ProductsDaoMem {

    constructor() {
        this.products = []
    }

    init() {
        console.log('products dao en memoria -> listo')
    }

    disconnect() {
        console.log('products dao en memoria -> cerrado')
    }

    #getIndex(id) {
        return this.products.findIndex(product => product.id === id)
    }

    getAll() {
        return asDto(this.products)
    }

    getById(idBuscado) {
        return asDto(this.products[ this.#getIndex(idBuscado) ])
    }

    save(productNuevo) {
        this.products.push(productNuevo)
        return asDto(productNuevo)
    }

    deleteById(idParaBorrar) {
        const [ borrada ] = this.products.splice(this.#getIndex(idParaBorrar), 1)
        return asDto(borrada)
    }

    deleteAll() {
        this.products = []
    }

    updateById(idParaReemplazar, nuevosCampos) {
        const index = this.#getIndex(idParaReemplazar)
        const actualizada = { ...this.products[ index ], ...nuevosCampos }
        this.products.splice(index, 1, actualizada)
        return asDto(actualizada)
    }
}