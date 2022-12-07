import mongoose from 'mongoose'
import { asDto } from '../dtos/CarritosDto.js'

const carritoSchema = new mongoose.Schema({
    idCar: { type: Number },
    idUser: { type: Number },
    idProd: { type: Number },
    title: { type: String },
    price: { type: Number },
    thumbnail: { type: String }
});

export default class CarritoDaoMongo {

    constructor(cnxStr) {
        this.cnxStr = cnxStr
        this.carritos = mongoose.model('carritos', carritoSchema)
    }

    async init() {
        await mongoose.connect(this.cnxStr)
        console.log('carritos dao en mongodb -> listo')
    }

    async disconnect() {
        await mongoose.disconnect()
        console.log('carritos dao en mongodb -> cerrado')
    }

    async getAll() {
        const carritos = await this.carritos.find({})
        return asDto(carritos)
    }

    async getById(idBuscado) {
        const carritos = await this.carritos.findOne({ id: idBuscado })
        return asDto(carritos)
    }

    async save(carritosNuevo) {
        await this.carritos.create(carritosNuevo)
        return asDto(carritosNuevo)
    }

    async deleteById(idParaBorrar) {
        const borrada = await this.carritos.findOneAndDelete({ id: idParaBorrar })
        return asDto(borrada)
    }

    async deleteAll() {
        await this.carritos.deleteMany({})
    }

    async updateById(idParaReemplazar, nuevosCampos) {
        const actualizada = await this.carritos.findOneAndUpdate({ id: idParaReemplazar }, { $set: nuevosCampos })
        return asDto(actualizada)
    }
}