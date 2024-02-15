const { contextBridge, ipcRenderer } = require("electron");
const Reservations = require("./models/Reservations.js");
const Credits = require("./models/Credits.js");
const Clients = require("./models/Clients.js");

contextBridge.exposeInMainWorld("api", {
  //Resrervations
  getReservations: (month, year) => Reservations.getReservations(month, year),
  storeReservations: () => Reservations.storeReservations(),
  updateReservations: (id, field, value, nom, tel) =>
    Reservations.updateReservations(id, field, value, nom, tel),
  deleteReservations: (id) => Reservations.deleteReservations(id),
//Credits
  getCredits: (month, year) => Credits.getCredits(month, year),
  getNonPayed: (month, year) => Credits.getNonPayed(month, year),
  storeCredits: () => Credits.storeCredits(),
  updateCredits: (id, field, value,date,montant,client,dateP) => Credits.updateCredits(id, field, value,date,montant,client,dateP),
 deleteCredits: (id,date, montant, client,dateP) => Credits.deleteCredits(id,date, montant, client,dateP),
//Clients
getClients: () => Clients.getClients(),
updateClient: (id,field, value) => Clients.updateClient(id,field, value),


});
