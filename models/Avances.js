let dbmgr = require("./dbmgr.js");
let db = dbmgr.db;

exports.getAvances = function () {
    const stmt = db.prepare(`
    SELECT * FROM avances;
    `);
    console.log(stmt.all());
    return stmt.all();
  };
  
  exports.storeAvances = () => {
    const stmt = db.prepare(
      `INSERT INTO avances DEFAULT VALUES;`
    );
    const info = stmt.run();
    return info.lastInsertRowid;
  }
  exports.updateAvances = (id, field, value) => {
    const stmt = db.prepare(
      `UPDATE Avances SET ${field} = $value WHERE id = $id`
    );
    const result = stmt.run({ id, value });
    return result;
  }
  exports.deleteAvances = (id) => {
    const stmt = db.prepare(
      `DELETE FROM avances WHERE id = $id;`
    );
    const info = stmt.run({id});
    return info.changes;
  }
  