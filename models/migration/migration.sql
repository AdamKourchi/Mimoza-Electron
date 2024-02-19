CREATE TABLE IF NOT EXISTS cars (
    id_vhcl INTEGER PRIMARY KEY AUTOINCREMENT,
    marque TEXT,
    immatricule TEXT,
    model INTEGER,
    code TEXT,
    la_visite TEXT,
    fin_de_circulation TEXT,
    mainlevee TEXT DEFAULT "EN CREDIT",
    facture_achat TEXT DEFAULT "NON DISPONIBLE",
    prix_achat REAL DEFAULT 0
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

CREATE TABLE IF NOT EXISTS credits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date_payment TEXT,
    creditR INTEGER,
    montant REAL DEFAULT 0,
    date_credit TEXT, 

    FOREIGN KEY (creditR) REFERENCES clients(idclient)
 
);
CREATE TABLE IF NOT EXISTS charges (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date_charge TEXT,
    observation TEXT,
    prix REAL DEFAULT 0,
    type_charge TEXT DEFAULT "General",
    id_vhcl INTEGER,
    
    FOREIGN KEY (id_vhcl) REFERENCES cars(id_vhcl)
);
CREATE TABLE IF NOT EXISTS avances (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date_avance TEXT,
    observation TEXT,
    montant REAL,
    type_avance TEXT
)