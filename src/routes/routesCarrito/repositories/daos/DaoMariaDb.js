import knex from "knex";
import { asDto } from "../dtos/CarritosDto.js";

export default class CarritosDaoMariaDb {
  constructor(config, tabla) {
    this.knex = knex(config);
    this.tabla = tabla;
  }

  async init() {
    console.log("carrito dao en mariadb -> listo");
  }

  async disconnect() {
    await this.knex.end();
    console.log("carrito dao en mariadb -> cerrado");
  }

  async getAll() {
    const carrito = await this.knex(this.tabla).select("*");
    return asDto(carrito);
  }

  async getById(idCar) {
    const carrito = await this.knex(this.tabla).where("idCar", idCar);
    return asDto(carrito);
  }

  async save(elem) {
    await this.knex(this.tabla).insert(elem);
    return asDto(elem);
  }

  async deleteById(idCar) {
    const borrada = await this.knex(this.tabla).where("idCar", idCar).del();
    return asDto(borrada);
  }

  async deleteAll() {
    await this.knex(this.tabla).del();
  }

  async updateById(idCar, elem) {
    const actualizada = await this.knex(this.tabla)
      .where("idCar", idCar)
      .update(elem);
    return asDto(actualizada);
  }
}
