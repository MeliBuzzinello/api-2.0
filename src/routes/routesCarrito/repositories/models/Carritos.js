export default class Carritos {
    #idCar
    #idUser
    #idProd
    #title
    #price
    #thumbnail

    constructor({ idCar, idUser, idProd, title, price, thumbnail }) {
        this.idCar = idCar
        this.idUser = idUser
        this.idProd = idProd
        this.title = title
        this.price = price
        this.thumbnail = thumbnail
    }

    get idCar() { return this.#idCar }

    set idCar(idCar) {
        if (!idCar) throw new Error('"idCar" es un campo requerido')
        this.#idCar = idCar
    }

    get idUser() { return this.#idUser }

    set idUser(idUser) {
        if (!idUser) throw new Error('"idUser" es un campo requerido')
        this.#idUser = idUser
    }

    get idProd() { return this.#idProd }

    set idProd(idProd) {
        if (!idProd) throw new Error('"idProd" es un campo requerido')
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