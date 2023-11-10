const db = require("../configs/db.config");
class Usuario {
  constructor({ id, email, password, deleted, createAt, updateAt, deletedAt }) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.deleted = deleted;
    this.createAt = createAt;
    this.updateAt = updateAt;
    this.deletedAt = deletedAt;
  }
  //static sirve para llamarlo sin crear una instancia
  static async getAll() {
    const connection = await db.createConnection();
    const [rows] = await connection.query(
      "SELECT id,email,password,deleted,created_at,updated_at,deleted_at FROM usuarios where deleted = 0"
    );
    connection.end();
    return rows;
  }
  static async getById(id) {
    const connection = await db.createConnection();
    const [rows] = await connection.query(
      "SELECT id,email,password,deleted,created_at,updated_at,deleted_at FROM usuarios WHERE id=? AND deleted = 0",
      [id]
    );
    connection.end();
    if (rows.length > 0) {
      const row = rows[0];
      return new Usuario({
        id: row.id,
        email: row.email,
        password: row.password,
        deleted: row.deleted,
        createAt: row.created_at,
        updateAt: row.updated_at,
        deletedAt: row.deleted_at,
      });
    }
    return null;
  }
  async save() {
    const connection = await db.createConnection();
    const [result] = await connection.execute(
      "INSERT INTO usuarios (email,password) VALUES(?,?)",
      [this.email, this.password]
    );
    connection.end();
    if (result.insertId == 0) {
      throw new Error("no se pudo crear el usuario");
    }
    this.id = result.insertId;
  }
  static async deleteById(id) {
    const connection = await db.createConnection();

    const deletedAt = new Date();
    const [result] = await connection.execute(
      "UPDATE usuarios SET deleted = 1, deleted_at = ? WHERE id = ?",
      [deletedAt, id]
    );

    connection.end();

    if (result.affectedRows == 0) {
      throw new Error("no se pudo eliminar el usuario");
    }
    return;
  }
  static async deleteFisicoById(id) {
    const connection = await db.createConnection();
    const [result] = await connection.execute(
      "DELETE FROM usuarios WHERE id = ?",
      [id]
    );
    connection.end();

    if (result.affectedRows == 0) {
      throw new Error("no se pudo eliminar el usuario");
    }

    return;
  }
  static async updateById(id,{email,password}){
    const connection = await db.createConnection();
    const updateAt = new Date();
    const [result] = await connection.execute("UPDATE usuarios SET email = ?, password = ?, updated_at= ? WHERE id = ?",[email,password,updateAt,id]);

    if(result.affectedRows == 0){
        throw new Error("no se pudo actualizar el usuario");
    }
     
    return
  }
}
module.exports = Usuario;
