const { contextBridge, ipcRenderer } = require("electron");
const Reservations = require("./models/Reservations.js");
const Cars = require("./models/Cars.js");
const Credits = require("./models/Credits.js");
const Charges = require("./models/Charges.js");
const Clients = require("./models/Clients.js");
const Avances = require("./models/Avances.js")
contextBridge.exposeInMainWorld("api", {
  //Resrervations
  getReservations: (month, year) => Reservations.getReservations(month, year),
  storeReservations: () => Reservations.storeReservations(),
  updateReservations: (id, field, value, nom, tel) =>
    Reservations.updateReservations(id, field, value, nom, tel),
  deleteReservations: (id) => Reservations.deleteReservations(id),
  //Cars
  getCars: () => Cars.getCars(),
  storeCars: () => Cars.storeCars(),
  updateCars: (id, field, value) => Cars.updateCars(id, field, value),
  deleteCars: (id) => Cars.deleteCars(id),
  getCarsCodes: () => Cars.getCarsCodes(),
  //Credits
  getCredits: (month, year) => Credits.getCredits(month, year),
  getNonPayed: (month, year) => Credits.getNonPayed(month, year),
  storeCredits: () => Credits.storeCredits(),
  updateCredits: (id, field, value, date, montant, client, dateP) =>
    Credits.updateCredits(id, field, value, date, montant, client, dateP),
  deleteCredits: (id, date, montant, client, dateP) =>
    Credits.deleteCredits(id, date, montant, client, dateP),
  //Charges
  getCharges: (month, year) => Charges.getCharges(month, year),
  storeCharges: () => Charges.storeCharges(),
  updateCharges: (id, field, value) => Charges.updateCharges(id, field, value),
  deleteCharges: (id) => Charges.deleteCharges(id),
  //Clients
  getClients: () => Clients.getClients(),
  updateClient: (id, field, value) => Clients.updateClient(id, field, value),
  //Avances 
  getAvances:()=>Avances.getAvances(),
  storeAvances:()=>Avances.getAvances(),
  updateAvances: (id,field,value) => Avances.updateAvances(id,field, value),

});
