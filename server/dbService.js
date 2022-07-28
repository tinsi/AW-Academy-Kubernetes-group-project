const pg = require("pg");
const dotenv = require("dotenv");
let instance = null;
dotenv.config();

const Client = pg.Client;

const connection = new Client({
  connectionString: process.env.DB_CONNECTIONSTRING,
});

connection.connect((err) => {
  if (err) {
    console.log(err.message);
  }
  console.log("db " + connection.state);
});

class DbService {
  static getDbServiceInstance() {
    return instance ? instance : new DbService();
  }

  async getAllData() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM names;";

        connection.query(query, (err, results) => {
          if (err) reject(new Error(err.message));
          //console.log(results);
          resolve(results);
        });
      });
      // console.log(response);
      return response.rows;
    } catch (error) {
      console.log(error);
    }
  }

  async insertNewName(name) {
    try {
      const dateAdded = new Date();
      const insertId = await new Promise((resolve, reject) => {
        const query = "INSERT INTO names (name) VALUES ($1) RETURNING id;";
        connection.query(query, [name], function (err, result) {
          if (err) reject(new Error(err.message));
          resolve(result.rows[0].id);
        });
      });
      return {
        id: insertId,
        name: name,
        dateAdded: dateAdded,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async deleteRowById(id) {
    try {
      id = parseInt(id, 10);
      const response = await new Promise((resolve, reject) => {
        const query = "DELETE FROM names WHERE id = $1";

        connection.query(query, [id], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result.rowCount);
        });
      });

      return response === 1 ? true : false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async updateNameById(id, name) {
    try {
      id = parseInt(id, 10);
      const response = await new Promise((resolve, reject) => {
        const query = "UPDATE names SET name = $1 WHERE id = $2";

        connection.query(query, [name, id], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result.rowCount);
        });
      });

      return response === 1 ? true : false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async searchByName(name) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM names WHERE name = $1;";

        connection.query(query, [name], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results.rows);
        });
      });

      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = DbService;
