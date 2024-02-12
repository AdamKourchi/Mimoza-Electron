const { contextBridge,ipcRenderer } = require("electron");
const Reservations = require("./models/Reservations.js");
<<<<<<< HEAD
const Cars = require("./models/Cars.js");
=======
const Credits = require("./models/Credits.js");
>>>>>>> origin/Adam

contextBridge.exposeInMainWorld("api", {
  getReservations: (month,year) => Reservations.getReservations(month,year),
  storeReservations:() => Reservations.storeReservations(),
  updateReservations: (id, field,value,nom,tel) => Reservations.updateReservations(id, field, value,nom,tel),
<<<<<<< HEAD
  
  getCars: () => Cars.getCars(),
  storeCars: () => Cars.storeCars(),
  updateCars: (id, field,value) => Cars.updateCars(id, field, value),
  deleteCars: (id) => Cars.deleteCars(id)
=======
  deleteReservations: (id) => Reservations.deleteReservations(id),

  
  getCredits: (month,year) => Credits.getCredits(month,year),
  getNonPayed: (month,year) => Credits.getNonPayed(month,year),
  storeCredits: () => Credits.storeCredits(),

>>>>>>> origin/Adam
});


