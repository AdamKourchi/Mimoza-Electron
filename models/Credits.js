let dbmgr = require("./dbmgr.js");
let db = dbmgr.db;

exports.getCredits = function (month, year) {
  const stmt = db.prepare(`
    SELECT *, clients.nom
    FROM credits 
    LEFT JOIN clients ON credits.creditR = clients.idclient
    WHERE date_payment LIKE '__/${month}/${year} %';
  `);

  return stmt.all();
};

exports.getNonPayed = function (month, year) {
    const stmt = db.prepare(`
      SELECT *, clients.nom
      FROM reservations 
      LEFT JOIN clients ON reservations.idclient = clients.idclient
      WHERE date_sortie LIKE '__/${month}/${year} %'
      AND credit != 0;
    `);
  
    return stmt.all();
  };
  
  exports.storeCredits = () => {
    const stmt = db.prepare(
      `INSERT INTO credits (date_payment) VALUES (strftime('%d/%m/%Y', 'now','localtime'))`
    );
    const info = stmt.run();
    const insertedRowId = info.lastInsertRowid;
    const insertedRow = db
      .prepare("SELECT * FROM credits WHERE rowid = ?")
      .get(insertedRowId);
  
    return insertedRow;
  };



exports.storeReservations = () => {
  const stmt = db.prepare(
    `INSERT INTO reservations (date_sortie,date_entree) VALUES (strftime('%d/%m/%Y 🕖 %H:%M', 'now','localtime'),strftime('%d/%m/%Y 🕖 %H:%M', 'now','localtime'))`
  );
  const info = stmt.run();
  const insertedRowId = info.lastInsertRowid;
  const insertedRow = db
    .prepare("SELECT * FROM reservations WHERE rowid = ?")
    .get(insertedRowId);

  return insertedRow;
};

exports.updateReservations = (id, field, value, nom, tel) => {
  if (field === "nom") {
    const stmt = db.prepare(
      `SELECT clients.nom, clients.tel,clients.idclient FROM clients WHERE nom = $value`
    );
    const selectResult = stmt.get({ value });
    if (selectResult) {
      const stmt = db.prepare(
        `UPDATE reservations SET idclient = $idclient WHERE id = $id`
      );
      stmt.run({ idclient: selectResult.idclient, id });
      return selectResult;
    }
    if (tel) {
      const stmt2 = db.prepare(
        `UPDATE clients SET nom = $value WHERE tel = $tel`
      );
      stmt2.run({ value, tel });
      return;
    }

    const stmt2 = db.prepare(`INSERT INTO clients (nom) VALUES ($value)`);
    const insertResult = stmt2.run({ value });
    // Retrieve the last inserted row ID
    const newClientId = insertResult.lastInsertRowid;
    // Uppate the reservation with the newly created client ID
    const stmt3 = db.prepare(
      `UPDATE reservations SET idclient = $newClientId WHERE id = $id`
    );
    const result = stmt3.run({ newClientId, id });

    return result;
  }

  if (field === "tel") {
    const stmt = db.prepare(
      `SELECT clients.nom, clients.tel,clients.idclient FROM clients WHERE tel = $value`
    );
    const selectResult = stmt.get({ value });

    if (selectResult) {
      const stmt2 = db.prepare(
        `UPDATE reservations SET idclient = $idclient WHERE id = $id`
      );
      stmt2.run({ idclient: selectResult.idclient, id });
      return selectResult; // Return the client's name
    } else {
      if (nom) {
        const stmt3 = db.prepare(
          `UPDATE clients SET tel = $value WHERE nom = $nom`
        );
        stmt3.run({ value, nom });
      } else {
        const stmt3 = db.prepare(`INSERT INTO clients (tel) VALUES ($value)`);
        const insertResult = stmt3.run({ value });
        const newClientId = insertResult.lastInsertRowid;
        const stmt4 = db.prepare(
          `UPDATE reservations SET idclient = $newClientId WHERE id = $id`
        );
        const result = stmt4.run({ newClientId, id });
        return result;
      }
    }
  }
  // For other fields, update the reservation directly
  const stmt5 = db.prepare(
    `UPDATE reservations SET ${field} = $value WHERE id = $id`
  );
  const result = stmt5.run({ id, value });
  return result;
};

exports.deleteReservations = (id) => {
  const stmt = db.prepare(`DELETE FROM reservations WHERE id = $id`);
  const result = stmt.run({ id });
  return result;
};
