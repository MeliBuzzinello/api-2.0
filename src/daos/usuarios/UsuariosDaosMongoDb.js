import ContenedorMongoDb from "../../contenedores/ContenedorMongoDb.js"

class UsuariosDaoMongoDb extends ContenedorMongoDb {

    constructor() {
        super('usuarios', {
            email: { type: String, required: true },
            password: { type: String, required: true },
            username: { type: String, required: true },
            direction: { type: String, required: true },
            year: { type: Number, required: true },
            phone: { type: Number, required: true },
            isAdmin: { type: Boolean, required: true, default: false },
        })
    }
}

export default UsuariosDaoMongoDb;