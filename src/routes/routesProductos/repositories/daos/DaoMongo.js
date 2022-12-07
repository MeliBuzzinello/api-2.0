import mongoose from 'mongoose'
import { asDto } from '../dtos/ProductosDto.js'

const productoSchema = new mongoose.Schema({
    id: { type: Number },
    title: { type: String },
    price: { type: Number },
    thumbnail: { type: String }
});

export default class ProductsDaoMongo {

    constructor(cnxStr) {
        this.cnxStr = cnxStr
        this.products = mongoose.model('productos', productoSchema)
    }

    async init() {
        await mongoose.connect(this.cnxStr)
        console.log('products dao en mongodb -> listo')
    }

    async disconnect() {
        await mongoose.disconnect()
        console.log('products dao en mongodb -> cerrado')
    }

    async getAll() {
        const products = await this.products.find({})
        return asDto(products)
    }

    async getById(idBuscado) {
        const product = await this.products.findOne({ id: idBuscado })
        return asDto(product)
    }

    async save(productNuevo) {
        await this.products.create(productNuevo)
        return asDto(productNuevo)
    }

    async deleteById(idParaBorrar) {
        const borrada = await this.products.findOneAndDelete({ id: idParaBorrar })
        return asDto(borrada)
    }

    async deleteAll() {
        await this.products.deleteMany({})
    }

    async updateById(idParaReemplazar, nuevosCampos) {
        const actualizada = await this.products.findOneAndUpdate({ id: idParaReemplazar }, { $set: nuevosCampos })
        return asDto(actualizada)
    }
}