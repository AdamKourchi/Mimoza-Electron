const { contextBridge,ipcRenderer } = require("electron");
const Reservations = require("./models/Reservations.js");
const Credits = require("./models/Credits.js");

contextBridge.exposeInMainWorld("api", {
  getReservations: (month,year) => Reservations.getReservations(month,year),
  storeReservations:() => Reservations.storeReservations(),
  updateReservations: (id, field,value,nom,tel) => Reservations.updateReservations(id, field, value,nom,tel),
  deleteReservations: (id) => Reservations.deleteReservations(id),

  
  getCredits: (month,year) => Credits.getCredits(month,year),
  getNonPayed: (month,year) => Credits.getNonPayed(month,year),
  storeCredits: () => Credits.storeCredits(),

});


