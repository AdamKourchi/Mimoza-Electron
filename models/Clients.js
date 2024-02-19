let dbmgr = require("./dbmgr.js");
let db = dbmgr.db;

exports.getClients = function () {
  const stmt = db.prepare(`
    SELECT *
    FROM clients 
    JOIN reservations ON clients.idclient = reservations.idclient
  `);

  return stmt.all();
};

exports.updateClient = (id, field, value) => {
  const stmt = db.prepare(
    `UPDATE clients SET ${field} = $value WHERE idclient = $id`
  );
  const result = stmt.run({ id, field, value });
  return result;
};
