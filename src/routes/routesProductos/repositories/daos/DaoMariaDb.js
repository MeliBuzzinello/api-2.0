import knex from "knex";
import { asDto } from "../dtos/ProductosDto.js";

export default class ProductsDaoMariaDb {
  constructor(config, tabla) {
    this.knex = knex(config);
    this.tabla = tabla;
  }

  async init() {
    console.log("products dao en mariadb -> listo");
  }

  async disconnect() {
    await this.knex.end();
    console.log("products dao en mariadb -> cerrado");
  }

  async getAll() {
    const products = await this.knex(this.tabla).select("*");
    return asDto(products);
  }

  async getById(idProd) {
    const product = await this.knex(this.tabla).where("idProd", idProd);
    return asDto(product);
  }

  //    COLOCA ID
  //   async save(elem) {
  //     const products = await this.listarAll();
  //     const idMay = Math.max(...products.map((x) => parseInt(x.idProd)));
  //     const prodId = { idProd: idMay + 1, ...elem };
  //     await this.knex(this.tabla).insert(prodId);
  //     return asDto(prodId);
  //   }

  async save(elem) {
    await this.knex(this.tabla).insert(elem);
    return asDto(elem);
  }

  async deleteById(idProd) {
    const borrada = await this.knex(this.tabla).where("idProd", idProd).del();
    return asDto(borrada);
  }

  async deleteAll() {
    await this.knex(this.tabla).del();
  }

  async updateById(idProd, elem) {
    const actualizada = await this.knex(this.tabla)
      .where("idProd", idProd)
      .update(elem);
    return asDto(actualizada);
  }
}
