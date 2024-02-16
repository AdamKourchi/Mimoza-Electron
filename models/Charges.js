let dbmgr = require("./dbmgr.js");
let db = dbmgr.db;

exports.getCharges = function (month, year) {
  const stmt = db.prepare(`
    SELECT * FROM charges WHERE date_charge LIKE '__/${month}/${year}%';
    `);
  return stmt.all({ month, year });
};

exports.storeCharges = () => {
  const stmt = db.prepare(
    `INSERT INTO charges (date_charge) VALUES (strftime('%d/%m/%Y', 'now', 'localtime')); `
  );
  const info = stmt.run();

  const res = db
    .prepare("SELECT * FROM charges WHERE id = ?")
    .get(info.lastInsertRowid);

  return res;
};

exports.updateCharges = (id, field, value) => {
  const stmt = db.prepare(
    `UPDATE charges SET ${field} = $value WHERE id = $id`
  );
  const result = stmt.run({ id, value });
  return result;
};

exports.deleteCharges = (id) => {
  const stmt = db.prepare(`DELETE FROM charges WHERE id = $id;`);
  const info = stmt.run({ id });
  return info.changes;
};
