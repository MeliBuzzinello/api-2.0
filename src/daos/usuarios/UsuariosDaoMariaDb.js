import ContenedorSQL from "../../contenedores/ContenedorSQL.js"
import config from '../../config.js'

class UsuariosDaoMariaDb extends ContenedorSQL {

    constructor() {
        super(config.mariaDb, 'usuarios')
    }
}

export default UsuariosDaoMariaDb;