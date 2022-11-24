import knex from 'knex';

class ContenedorSQL {

    constructor(config, tabla) {
        this.knex = knex(config)
        this.tabla = tabla
    }

    async listar(idProd) {
        const resultado = await this.knex(this.tabla).where('idProd', idProd);
        return resultado;
    }

    async listarAll() {
        const resultado = await this.knex(this.tabla).select('*');
        return resultado;
    }

    async guardar(elem) {
        const products = await this.listarAll();
        const idMay = Math.max(...products.map(x=>parseInt(x.idProd)))
        const prodId = {idProd:idMay + 1, ...elem};
        await this.knex(this.tabla).insert(prodId);
    }

    async actualizar(idProd, elem) {
        console.log(idProd)
        console.log(elem)
        await this.knex(this.tabla).where('idProd', idProd).update( elem );
    }

    async borrar(idProd) {
        await this.knex(this.tabla).where('idProd', idProd).del();
    }

    async borrarAll() {
        await this.knex(this.tabla).del();
    }
}

export default ContenedorSQL;