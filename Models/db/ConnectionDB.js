const mysql = require('mysql2/promise');

class ConnectionDB {
  constructor() {
    this.pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
      // port: process.env.DB_PORT,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  }

  // Método para conectar ao banco de dados
  async connectDB() {
    try {
      await this.pool.getConnection();
      console.log('Conectado ao MySQL');
    } catch (err) {
      console.error('Erro ao conectar ao MySQL', err.stack);
      throw err;
    }
  }

  // Método para desconectar do banco de dados
  async disconnectDB() {
    try {
      await this.pool.end();
      console.log('Conexão com MySQL encerrada');
    } catch (err) {
      console.error('Erro ao encerrar a conexão com MySQL', err.stack);
      throw err;
    }
  }

  // Método genérico para executar queries
  async runQuery(query, params = []) {
    const connection = await this.pool.getConnection();
    try {
      const [rows] = await connection.execute(query, params);
      return rows;
    } catch (err) {
      console.error('Erro ao executar a consulta', err.stack);
      throw err;
    } finally {
      connection.release();
    }
  }
}

// ------------------------------------------------------------
module.exports = ConnectionDB;
