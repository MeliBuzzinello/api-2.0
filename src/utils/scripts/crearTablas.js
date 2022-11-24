import knex from 'knex'
import config from '../../config.js'

// opciones SQL: mariaDb, sqlite3

crearTablasProductos(knex(config.mariaDb))

crearTablasCarritos(knex(config.mariaDb))

crearTablasProdEnCarritos(knex(config.mariaDb))

//------------------------------------------

async function crearTablasProductos(sqlClient) {
    try {
        await sqlClient.schema.dropTableIfExists("productos");
  
        await sqlClient.schema.createTable("productos", (table) => {
            table.increments("idProd");
            table.string("title");
            table.float("price");
            table.string("thumbnail");
        });
  
        console.log("tabla productos creada con éxito");
      } catch (error) {
        console.log(`error al crear tabla productos ${error}`);
      } 
    }
    


//------------------------------------------

async function crearTablasCarritos(sqlClient) {
    try {
      await sqlClient.schema.dropTableIfExists("usuarios");
  
      await sqlClient.schema.createTable("usuarios", (table) => {
        table.increments("idUser");
        table.string("email");
        table.string("password");
        table.string("nombre");
        table.string("direccion");
        table.integer("edad");
        table.string("telefono");
        table.boolean("esAdmin");
      });
  
        console.log("tabla usuarios creada con éxito");
      } catch (error) {
        console.log(`error al crear tabla usuarios ${error}`);
      } 
    }


//---------------------------------------------------

async function crearTablasProdEnCarritos(sqlClient) {
  try {
      await sqlClient.schema.dropTableIfExists("prodsencarrito");

      await sqlClient.schema.createTable("prodsencarrito", (table) => {
          table.increments("idCar");
          table.integer("idUser");
          table.integer("idProd");
          table.string("title");
          table.float("price");
          table.string("thumbnail");
      });
      console.log("tabla prodsencarrito creada con éxito");
    } catch (error) {
      console.log(`error al crear tabla prodsencarrito ${error}`);
    } 
  }
    

export { crearTablasProductos, crearTablasCarritos, crearTablasProdEnCarritos };