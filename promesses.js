/**
 * npm i request dans le dossier principal de votre projet
 */
let request = require("request");

class Reservation {

    constructor() {
        this.id
        this.parking
        this.parkingId
        this.city
        this.clientName
        this.vehicle
        this.licensePlate
        this.checkin
        this.checkout
        this.ok
    }
}

function getParkingId(id) {
    // la méthode retourne un objet promesse
    return new Promise((resolve, reject) => {
        request(`http://localhost:8090/parkings/${id}`, {}, (err, response) => {
            // callback(id); plus d'utilisation de callback
            // gestion des erreurs
            if (err) {
                reject(err);
                // en cas d'erreur
            }
            else {
                resolve(JSON.parse(response.body));
                // en cas de succès
            }
        });
    });
}

function getReservationsParkingId(id) {
    // la méthode retourne un objet promesse
    return new Promise((resolve, reject) => {
        request(`http://localhost:8090/parkings/${id}/reservations`, {}, (err, response) => {
            // callback(id); plus d'utilisation de callback
            // gestion des erreurs
            if (err) {
                reject(err);
                // en cas d'erreur
            }
            else {
                resolve(JSON.parse(response.body));
                // en cas de succès
            }
        });
    });
}
/**
 * Exécution du code des Promesses
 */

let setReservations = new Set();
let mapReservations = new Map();

getParkingId(1).then(
    (data) => {
        //resolve
        //console.log(data)
        return getReservationsParkingId(data.id) //retourne un promise par le resolve callback
    },
    (reject) => console.log(reject) //retour du promise par reject callback
).then( // Excécute le contenu du promise
    /*(reservations) => {
        console.log(reservations.length)
        reservation.forEach(reservation => {
            setReservations.add(reservation)
        });
        console.log(setReservations.size)
        //setReservations.clear()
        //console.log(setReservations.size)
        setReservations.delete(reservations[0])
        console.log(setReservations.size)
    }*/
    (reservations) => {
        reservations.forEach((reservation, index) => {
            mapReservations.set(index, reservation)
        });
        //console.log(mapReservations)
        //console.log(mapReservations.get(1))
        //mapReservations.delete(1)
        //console.log(mapReservations)
        console.log(mapReservations.has("toto"))
        console.log(mapReservations.has(0))
        console.log(mapReservations.entries()) //on a iterable sur les Value ENTRIES
    }
)
    .catch(err => console.log(err));


/*
function* creerID(){   let index = 1;
       while(index < 5){     
         yield index++; 
      } 
}

let gen = creerID()

Promise.all(
    [getParkingId(gen.next().value),getReservationsParkingId(gen.next().value),getParkingId(gen.next().value)]
    ).then
(
    result=>
    console.log(result)).
    catch(err=>console.log(err))
*/

