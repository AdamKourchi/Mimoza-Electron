let dbmgr = require("./dbmgr.js");
let db = dbmgr.db;

exports.getAvances = function (month, year) {
  const stmt = db.prepare(`
    SELECT * FROM avances
    WHERE date_avance LIKE '__/${month}/${year}%';
    `);
  console.log(stmt.all());
  return stmt.all();
};

exports.storeAvances = (type) => {
  const stmt = db.prepare(
    `INSERT INTO avances (date_avance,type_avance) VALUES (strftime('%d/%m/%Y', 'now', 'localtime'),$type);`
  );
  const info = stmt.run({ type });
  const insertedAvance = db
    .prepare("SELECT * FROM avances WHERE id = ?")
    .get(info.lastInsertRowid);

  return insertedAvance;
};
exports.updateAvances = (id, field, value) => {
  const stmt = db.prepare(
    `UPDATE avances SET ${field} = $value WHERE id = $id`
  );
  const result = stmt.run({ id, value });
  return result;
};
exports.deleteAvances = (id) => {
  const stmt = db.prepare(`DELETE FROM avances WHERE id = $id;`);
  const info = stmt.run({ id });
  return info.changes;
};
