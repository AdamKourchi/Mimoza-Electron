CREATE TABLE IF NOT EXISTS cars (
    id_vhcl INTEGER PRIMARY KEY AUTOINCREMENT,
    marque TEXT,
    immatricule TEXT,
    model TEXT,
    la_visite DATE,
    fin_de_circulation DATE,
    mainlevee INTEGER DEFAULT 0,
    facture_achat INTEGER DEFAULT 0,
    prix REAL
);
CREATE TABLE IF NOT EXISTS clients 
(
    idclient INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT,
    tel TEXT
);
CREATE  TABLE IF NOT EXISTS  reservations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    idclient INTEGER,
    date_sortie TEXT,
    id_vhcl INTEGER,
    date_entree TEXT,
    prix REAL DEFAULT 0,
    n_jr INTEGER DEFAULT 0,
    montant REAL DEFAULT 0,
    caisse REAL DEFAULT 0,
    credit REAL DEFAULT 0,
    observation TEXT,
    status TEXT,
	FOREIGN KEY (idclient) REFERENCES clients(idclient),  
	FOREIGN KEY (id_vhcl) REFERENCES cars(id_vhcl)
);