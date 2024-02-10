const { contextBridge,ipcRenderer } = require("electron");
const Reservations = require("./models/Reservations.js");

contextBridge.exposeInMainWorld("api", {
  getReservations: () => Reservations.getReservations(),
  storeReservations:() => Reservations.storeReservations(),
  updateReservations: (id, field,value,nom,tel) => Reservations.updateReservations(id, field, value,nom,tel),

});


