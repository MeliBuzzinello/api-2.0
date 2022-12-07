export default class Product {
    #idProd
    #title
    #price
    #thumbnail

    constructor({ idProd, title, price, thumbnail }) {
        this.idProd = idProd
        this.title = title
        this.price = price
        this.thumbnail = thumbnail
    }

    get idProd() { return this.#idProd }

    set idProd(idProd) {
        if (!idProd) throw new Error('"id" es un campo requerido')
        this.#idProd = idProd
    }

    get title() { return this.#title }

    set title(title) {
        if (!title) throw new Error('"title" es un campo requerido')
        this.#title = title
    }

    get price() { return this.#price }

    set price(price) {
        if (!price) throw new Error('"price" es un campo requerido')
        this.#price = price
    }

    get thumbnail() { return this.#thumbnail }

    set thumbnail(thumbnail) {
        if (!thumbnail) throw new Error('"thumbnail" es un campo requerido')
        this.#thumbnail = thumbnail
    } 
}