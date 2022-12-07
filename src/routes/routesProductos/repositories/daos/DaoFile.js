import fs from 'fs'
import { asDto } from '../dtos/ProductosDto.js'

export default class ProductsDaoFile {

    #ready = false

    constructor(ruta) {
        this.ruta = ruta
        this.products = []
    }

    async init() {
        try {
            await fs.promises.readFile(this.ruta, 'utf-8')
            this.#ready = true
            console.log('product dao en archivo -> listo')
        } catch (error) {
            await fs.promises.writeFile(this.ruta, '[]')
            this.#ready = true
            console.log('product dao en archivo -> listo')
        }
    }

    disconnect() {
        console.log('product dao en archivo -> cerrado')
    }

    #checkReady() {
        if (!this.#ready) throw new Error('INTERNAL_ERROR: dao no conectado!')
    }

    async #leerArchivo() {
        this.#checkReady()
        const texto = await fs.promises.readFile(this.ruta, 'utf-8')
        this.products = JSON.parse(texto)
    }

    async #escribirArchivo() {
        this.#checkReady()
        const texto = JSON.stringify(this.products, null, 2)
        await fs.promises.writeFile(this.ruta, texto)
    }

    #getIndex(id) {
        return this.products.findIndex(product => product.id === id)
    }

    async getAll() {
        await this.#leerArchivo()
        return asDto(this.products)
    }

    async getById(idBuscado) {
        await this.#leerArchivo()
        return asDto(this.products[ this.#getIndex(idBuscado) ])
    }

    async save(productNuevo) {
        await this.#leerArchivo()
        this.products.push(productNuevo)
        await this.#escribirArchivo()
        return asDto(productNuevo)
    }

    async deleteById(idParaBorrar) {
        await this.#leerArchivo()
        const [ borrada ] = this.products.splice(this.#getIndex(idParaBorrar), 1)
        await this.#escribirArchivo()
        return asDto(borrada)
    }

    async deleteAll() {
        this.products = []
        await this.#escribirArchivo()
    }

    async updateById(idParaReemplazar, nuevosCampos) {
        await this.#leerArchivo()
        const index = this.#getIndex(idParaReemplazar)
        const actualizada = { ...this.products[ index ], ...nuevosCampos }
        this.products.splice(index, 1, actualizada)
        await this.#escribirArchivo()
        return asDto(actualizada)
    }
}