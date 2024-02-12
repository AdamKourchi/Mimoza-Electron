let dbmgr = require("./dbmgr.js");
let db = dbmgr.db;


exports.getCars = function () {
  const stmt = db.prepare(`
  SELECT * FROM cars;
  `);
  console.log(stmt.all());
  return stmt.all();
};

exports.storeCars = (marque, immatricule, model, la_visite, fin_de_circulation, mainlevee, facture_achat, prix) => {
  const stmt = db.prepare(
    `INSERT INTO cars DEFAULT VALUES;`
  );
  const info = stmt.run();
  return info.lastInsertRowid;
}
exports.updateCars = ( marque, immatricule, model, la_visite, fin_de_circulation, mainlevee, facture_achat, prix) => {
  const stmt = db.prepare(
    `UPDATE cars SET marque = ?, immatricule = ?, model = ?, la_visite = ?, fin_de_circulation = ?, mainlevee = ?, facture_achat = ?, prix = ? WHERE id = ?;`
  );
  const info = stmt.run(marque, immatricule, model, la_visite, fin_de_circulation, mainlevee, facture_achat, prix);
  return info.changes;
}
exports.deleteCars = (id) => {
  const stmt = db.prepare(
    `DELETE FROM cars WHERE id = ?;`
  );
  const info = stmt.run(id);
  return info.changes;
}


