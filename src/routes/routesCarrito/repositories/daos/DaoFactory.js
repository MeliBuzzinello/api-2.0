import CarritoDaoMongo from "./DaoMongo.js";
import CarritosDaoFile from "./DaoFile.js";
import CarritoDaoMem from "./DaoMem.js";
import CarritosDaoMariaDb from "./DaoMariaDb.js";

import config from '../../../../config.js';

const rutaArchivoCar = "./carritos.txt";

const option = process.argv[2] || "Mem";

let dao;

switch (option) {
  case "Mongo":
    dao = new CarritoDaoMongo(config.mongodb.cnxStr);
    await dao.init();
    break;
  case "File":
    dao = new CarritoDaoMem(rutaArchivoCar);
    await dao.init();
    break;
  case "MariaDb":
    dao = new CarritosDaoMariaDb(config.mariaDb, 'carritos');
    await dao.init();
    break;
  default:
    dao = new CarritosDaoFile();
    dao.init();
}

export default class CarritoDaoFactory {
  static getDao() {
    return dao;
  }
}
