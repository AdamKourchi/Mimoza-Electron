let dbmgr = require("./dbmgr.js");
let db = dbmgr.db;

exports.getReservations = function () {
  const stmt = db.prepare(`
  SELECT *, clients.nom, clients.tel 
  FROM reservations 
  LEFT JOIN clients ON reservations.idclient = clients.idclient;
  
  `);
  return stmt.all();
};

exports.storeReservations = () => {
  const stmt = db.prepare(
    `INSERT INTO reservations (date_sortie) VALUES (datetime('now'))`
  );
  const info = stmt.run();
  return info.lastInsertRowid;
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
/*
 r.id AS id,
    r.date_sortie AS date_sortie,
    r.date_entree AS date_entree,
    r.prix AS prix,
    r.n_jr AS n_jr,
    r.montant AS montant,
    r.caisse AS caisse,
    r.credit AS credit,
    r.observation AS observation,
    r.status AS status,
    c.idclient AS client_id,
    c.nom AS client_nom,
    c.tel AS client_tel,
    ca.id_vhcl AS car_id,
    ca.marque AS car_marque,
    ca.imt AS car_imt,
    ca.code AS car_code,
    ca.fin_circ AS car_fin_circ,
    ca.visite AS car_visite,
    ca.mainlevee AS car_mainlevee,
    ca.facture_achat AS car_facture_achat,
    ca.prix_achat AS car_prix_achat
    FROM 
    reservations r
INNER JOIN 
    clients c ON r.idclient = c.idclient
INNER JOIN 
    cars ca ON r.id_vhcl = ca.id_vhcl;*/
