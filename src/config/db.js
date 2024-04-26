const { Pool } = require('pg');
const dotenv = require("dotenv");
dotenv.config();
class Database {
  constructor() {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL // Utilizar el valor de la variable de entorno DATABASE_URL
    });
  }

  async connect() {
    try {
      this.client = await this.pool.connect();
      console.log('Conexión establecida a la base de datos');
      return this.client;
    } catch (error) {
      console.error('Error al conectar a la base de datos:', error);
      throw new Error('Error al conectar a la base de datos');
    }
  }

  async close() {
    try {
      await this.client.release();
      console.log('Conexión cerrada');
    } catch (error) {
      console.error('Error al cerrar la conexión:', error);
      throw new Error('Error al cerrar la conexión');
    }
  }
}

module.exports = new Database();
