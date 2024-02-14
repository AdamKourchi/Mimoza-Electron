const { contextBridge,ipcRenderer } = require("electron");
const Reservations = require("./models/Reservations.js");
const Cars = require("./models/Cars.js");
const Credits = require("./models/Credits.js");
const Charges = require("./models/Charges.js");

contextBridge.exposeInMainWorld("api", {
  //Reservations
  getReservations: (month,year) => Reservations.getReservations(month,year),
  storeReservations:() => Reservations.storeReservations(),
  updateReservations: (id, field,value,nom,tel) => Reservations.updateReservations(id, field, value,nom,tel),
  deleteReservations: (id) => Reservations.deleteReservations(id),
  //Cars
  getCars: () => Cars.getCars(),
  storeCars: () => Cars.storeCars(),
  updateCars: (id, field,value) => Cars.updateCars(id, field, value),
  deleteCars: (id) => Cars.deleteCars(id),
  //Credits
  getCredits: (month,year) => Credits.getCredits(month,year),
  getNonPayed: (month,year) => Credits.getNonPayed(month,year),
  storeCredits: () => Credits.storeCredits(),
  //Charges
  getCharges: () => Charges.getCharges(),
  storeCharges: () => Charges.storeCharges(),
  updateCharges: (id, field,value) => Charges.updateCharges(id, field, value),
  deleteCharges: (id) => Charges.deleteCharges(id),

});


