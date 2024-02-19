let dbmgr = require("./dbmgr.js");
let db = dbmgr.db;

exports.getCars = function () {
  const stmt = db.prepare(`
  SELECT * FROM cars;
  `);
  console.log(stmt.all());
  return stmt.all();
};

exports.getCarsCodes = function () {
  const stmt = db.prepare(`
  SELECT code FROM cars WHERE code IS NOT NULL;

  `);
  console.log(stmt.all());
  return stmt.all();
};

exports.storeCars = () => {
  const stmt = db.prepare(`INSERT INTO cars DEFAULT VALUES;`);
  const info = stmt.run();
  return info.lastInsertRowid;
};
exports.updateCars = (id, field, value) => {
  const stmt = db.prepare(
    `UPDATE cars SET ${field} = $value WHERE id_vhcl = $id`
  );
  const result = stmt.run({ id, value });
  return result;
};
exports.deleteCars = (id) => {
  const stmt = db.prepare(`DELETE FROM cars WHERE id_vhcl = $id;`);
  const info = stmt.run({ id });
  return info.changes;
};
