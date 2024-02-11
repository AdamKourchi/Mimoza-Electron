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

