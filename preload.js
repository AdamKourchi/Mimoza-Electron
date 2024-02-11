const { contextBridge,ipcRenderer } = require("electron");
const Reservations = require("./models/Reservations.js");
const Cars = require("./models/Cars.js");

contextBridge.exposeInMainWorld("api", {
  getReservations: () => Reservations.getReservations(),
  storeReservations:() => Reservations.storeReservations(),
  updateReservations: (id, field,value,nom,tel) => Reservations.updateReservations(id, field, value,nom,tel),
  
  getCars: () => Cars.getCars(),
  storeCars: () => Cars.storeCars()
});


