export default class ProductDto {
    constructor({ idProd, title, price, thumbnail }) {
        this.idProd = idProd
        this.title = title
        this.price = price
        this.thumbnail = thumbnail
    }
}

export function asDto(prod) {
    if (Array.isArray(prod))
        return prod.map(p => new ProductDto(p))
    else
        return new ProductDto(prod)
}
