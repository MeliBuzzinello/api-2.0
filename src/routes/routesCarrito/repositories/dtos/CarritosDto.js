export default class CarritoDto {
    constructor({ idCar, idUser, idProd, title, price, thumbnail }) {
        this.idCar = idCar
        this.idUser = idUser
        this.idProd = idProd
        this.title = title
        this.price = price
        this.thumbnail = thumbnail
    }
}

export function asDto(card) {
    if (Array.isArray(card))
        return card.map(p => new CarritoDto(p))
    else
        return new CarritoDto(card)
}