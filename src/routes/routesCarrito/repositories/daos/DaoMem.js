import { asDto } from '../dtos/CarritosDto.js'

export default class CarritoDaoMem {

    constructor() {
        this.carrito = []
    }

    init() {
        console.log('carrito dao en memoria -> listo')
    }

    disconnect() {
        console.log('carrito dao en memoria -> cerrado')
    }

    #getIndex(id) {
        return this.carrito.findIndex(carrito => carrito.id === id)
    }

    getAll() {
        return asDto(this.carrito)
    }

    getById(idBuscado) {
        return asDto(this.carrito[ this.#getIndex(idBuscado) ])
    }

    save(carritoNuevo) {
        this.carrito.push(carritoNuevo)
        return asDto(carritoNuevo)
    }

    deleteById(idParaBorrar) {
        const [ borrada ] = this.carrito.splice(this.#getIndex(idParaBorrar), 1)
        return asDto(borrada)
    }

    deleteAll() {
        this.carrito = []
    }

    updateById(idParaReemplazar, nuevosCampos) {
        const index = this.#getIndex(idParaReemplazar)
        const actualizada = { ...this.carrito[ index ], ...nuevosCampos }
        this.carrito.splice(index, 1, actualizada)
        return asDto(actualizada)
    }
}