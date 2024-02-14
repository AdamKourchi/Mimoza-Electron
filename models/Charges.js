let dbmgr = require("./dbmgr.js");
let db = dbmgr.db;

exports.getCharges = function () {
    const stmt = db.prepare(`
    SELECT * FROM charges;
    `);
    console.log(stmt.all());
    return stmt.all();
}


exports.storeCharges = () => {
    const stmt = db.prepare(
        `INSERT INTO charges DEFAULT VALUES;`
    );
    const info = stmt.run();
    return info.lastInsertRowid;
}

exports.updateCharges = (id, field, value) => {
    const stmt = db.prepare(
        `UPDATE charges SET ${field} = $value WHERE id = $id`
    );
    const result = stmt.run({ id, value });
    return result;
}

exports.deleteCharges = (id) => {
    const stmt = db.prepare(
        `DELETE FROM charges WHERE id = $id;`
    );
    const info = stmt.run({ id });
    return info.changes;
}