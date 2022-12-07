import ProductsDaoMongo from "./DaoMongo.js";
import ProductsDaoFile from "./DaoFile.js";
import ProductsDaoMem from "./DaoMem.js";
import ProductsDaoMariaDb from "./DaoMariaDb.js";

import config from '../../../../config.js';

const rutaArchivoPersonas = "./personas.txt";

const option = process.argv[2] || "Mem";

let dao;

switch (option) {
  case "Mongo":
    dao = new ProductsDaoMongo(config.mongodb.cnxStr);
    await dao.init();
    break;
  case "File":
    dao = new ProductsDaoFile(rutaArchivoPersonas);
    await dao.init();
    break;
  case "MariaDb":
    dao = new ProductsDaoMariaDb(config.mariaDb, 'productos');
    await dao.init();
    break;
  default:
    dao = new ProductsDaoMem();
    dao.init();
}

export default class ProductDaoFactory {
  static getDao() {
    return dao;
  }
}
