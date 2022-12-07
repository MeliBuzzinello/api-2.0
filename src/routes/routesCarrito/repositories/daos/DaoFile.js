import fs from 'fs'
import { asDto } from '../dtos/CarritosDto.js'

export default class CarritosDaoFile {

    #ready = false

    constructor(ruta) {
        this.ruta = ruta
        this.carritos = []
    }

    async init() {
        try {
            await fs.promises.readFile(this.ruta, 'utf-8')
            this.#ready = true
            console.log('carritos dao en archivo -> listo')
        } catch (error) {
            await fs.promises.writeFile(this.ruta, '[]')
            this.#ready = true
            console.log('carritos dao en archivo -> listo')
        }
    }

    disconnect() {
        console.log('carritos dao en archivo -> cerrado')
    }

    #checkReady() {
        if (!this.#ready) throw new Error('INTERNAL_ERROR: dao no conectado!')
    }

    async #leerArchivo() {
        this.#checkReady()
        const texto = await fs.promises.readFile(this.ruta, 'utf-8')
        this.carritos = JSON.parse(texto)
    }

    async #escribirArchivo() {
        this.#checkReady()
        const texto = JSON.stringify(this.carritos, null, 2)
        await fs.promises.writeFile(this.ruta, texto)
    }

    #getIndex(id) {
        return this.carritos.findIndex(car => car.id === id)
    }

    async getAll() {
        await this.#leerArchivo()
        return asDto(this.carritos)
    }

    async getById(idBuscado) {
        await this.#leerArchivo()
        return asDto(this.carritos[ this.#getIndex(idBuscado) ])
    }

    async save(carNuevo) {
        await this.#leerArchivo()
        this.carritos.push(carNuevo)
        await this.#escribirArchivo()
        return asDto(carNuevo)
    }

    async deleteById(idParaBorrar) {
        await this.#leerArchivo()
        const [ borrada ] = this.carritos.splice(this.#getIndex(idParaBorrar), 1)
        await this.#escribirArchivo()
        return asDto(borrada)
    }

    async deleteAll() {
        this.carritos = []
        await this.#escribirArchivo()
    }

    async updateById(idParaReemplazar, nuevosCampos) {
        await this.#leerArchivo()
        const index = this.#getIndex(idParaReemplazar)
        const actualizada = { ...this.carritos[ index ], ...nuevosCampos }
        this.carritos.splice(index, 1, actualizada)
        await this.#escribirArchivo()
        return asDto(actualizada)
    }
}