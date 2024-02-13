let dbmgr = require("./dbmgr.js");
let db = dbmgr.db;

exports.getCredits = function (month, year) {
  const stmt = db.prepare(`
    SELECT *, clients.nom as nom
    FROM credits 
    LEFT JOIN clients ON credits.creditR = clients.idclient
    WHERE date_payment LIKE '__/${month}/${year}%';
  `);

  return stmt.all();
};

exports.getNonPayed = function (month, year) {
  const stmt = db.prepare(`
      SELECT *, clients.nom
      FROM reservations 
      LEFT JOIN clients ON reservations.idclient = clients.idclient
      WHERE date_sortie LIKE '__/${month}/${year}%'
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

exports.updateCredits = (id, field, value, date, montant, client, dateP) => {
  console.log("updateCredits", montant);
  if (field === "nom") {
    const stmt = db.prepare(
      `SELECT clients.nom,clients.idclient FROM clients WHERE nom = $value`
    );
    const selectResult = stmt.get({ value });
    const stmt2 = db.prepare(
      `UPDATE credits SET creditR = $idclient WHERE id = $id`
    );
    stmt2.run({ idclient: selectResult.idclient, id });
    return selectResult;
  }
  if (field === "montant" && date) {
    db.transaction(() => {
      // Update reservations table
      db.prepare(
        `
          UPDATE reservations 
          SET 
              caisse = caisse + $montant,
              credit = credit - $montant,
              observation =  observation || '**P ${montant} le' || '${dateP}'
              WHERE 
              idclient = $client 
              AND date_sortie LIKE $date || ' %';
          `
      ).run({ id, date, montant, client, dateP });

      // Update credits table
      const result = db
        .prepare(
          `
                UPDATE credits 
                SET montant = montant + $montant 
                WHERE id = $id;
            `
        )
        .run({ id, montant });
    })();

    return "result";
  }
  if (field === "date_credit" && montant) {
    db.transaction(() => {
      // Update reservations table
      db.prepare(
        `
        UPDATE reservations 
        SET 
            caisse = caisse + $montant,
            credit = credit - $montant,
            observation =  COALESCE(observation, '') || '**P ${montant} le' || '${dateP}'
        WHERE 
            idclient = $client 
            AND date_sortie LIKE $date || ' %';
        `
      ).run({ id, date, montant, client, dateP });

      // Update credits table
      const result = db
        .prepare(
          `
              UPDATE credits 
              SET date_credit = $date
              WHERE id = $id;
          `
        )
        .run({ id, date });
    })();

    return "result";
  } else {
    // For other fields, update the reservation directly
    const stmt5 = db.prepare(
      `UPDATE credits SET ${field} = $value WHERE id = $id`
    );
    const result = stmt5.run({ id, value });
    return result;
  }
};

exports.deleteCredits = (id, date, montant, client, dateP) => {
  function removeLastObservation(observation) {
    const lastIndex = observation.lastIndexOf("**P");
    if (lastIndex !== -1) {
      return observation.substring(0, lastIndex);
    }
    return observation;
  }

  if (montant && date && client && dateP) {
    const oldObservation = db
      .prepare(
        `SELECT observation FROM reservations WHERE date_sortie LIKE $date || ' %' AND idclient = $client`
      )
      .get({ date, client }).observation;

    db.transaction(() => {
      // Update reservations table
      db.prepare(
        `
            UPDATE reservations 
            SET 
                caisse = caisse - $montant,
                credit = credit + $montant,
                observation = $observation
            WHERE 
                idclient = $client 
                AND date_sortie LIKE $date || ' %';
          `
      ).run({
        montant: montant,
        client: client,
        date: date,
        observation: removeLastObservation(oldObservation),
      });

      // Update credits table
      db.prepare(`DELETE FROM credits WHERE id = $id`).run({ id });
    })();
  } else {
    db.prepare(`DELETE FROM credits WHERE id = $id`).run({ id });
  }
};
