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
        `INSERT INTO cars (marque, immatricule, model, la_visite, fin_de_circulation, mainlevee, facture_achat, prix)
         VALUES ($marque, $immatricule, $model, $la_visite, $fin_de_circulation, $mainlevee, $facture_achat, $prix)`
    );
    const info = stmt.run({ $marque: marque, $immatricule: immatricule, $model: model, $la_visite: la_visite, $fin_de_circulation: fin_de_circulation, $mainlevee: mainlevee, $facture_achat: facture_achat, $prix: prix });
    console.log(info.lastInsertRowid);
    return info.lastInsertRowid;
}

