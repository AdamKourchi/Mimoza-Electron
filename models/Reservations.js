let dbmgr = require("./dbmgr.js");
let db = dbmgr.db;

exports.getReservations = function (month, year) {
  const stmt = db.prepare(`
  SELECT *, clients.nom, clients.tel ,cars.code
  FROM reservations 
  LEFT JOIN clients ON reservations.idclient = clients.idclient
  LEFT JOIN cars ON reservations.id_vhcl = cars.id_vhcl
  WHERE date_sortie LIKE '__/${month}/${year}%'
  `);

  return stmt.all({ month, year });
};

exports.storeReservations = () => {
  const stmt = db.prepare(
    `INSERT INTO reservations (date_sortie) VALUES (strftime('%d/%m/%Y 🕖 %H:%M', 'now', 'localtime'))`
  );
  const info = stmt.run();

  const insertedRes = db
    .prepare("SELECT * FROM reservations WHERE id = ?")
    .get(info.lastInsertRowid);

  return insertedRes;
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
if(field === "code"){
  const stmt = db.prepare(
    `SELECT cars.code, cars.id_vhcl FROM cars WHERE code = $value`
  );
  const selectResult = stmt.get({ value });
  if (selectResult) {
    const stmt2 = db.prepare(
      `UPDATE reservations SET id_vhcl = $id_vhcl WHERE id = $id`
    );
    stmt2.run({ id_vhcl: selectResult.id_vhcl, id });
    return selectResult;
  }
  const stmt2 = db.prepare(`INSERT INTO cars (code) VALUES ($value)`);
  const insertResult = stmt2.run({ value });
  const newCarId = insertResult.lastInsertRowid;
  const stmt3 = db.prepare(
    `UPDATE reservations SET id_vhcl = $newCarId WHERE id = $id`
  );
  const result = stmt3.run({ newCarId, id });
  return result;
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

