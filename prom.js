/**
 * Promise, Set, Map, Arrow Function
 */

let request = require("request");

class TripService {
    constructor() {
        // TODO Set of 3 trips
        // new Trip('paris', 'Paris', 'img/paris.jpg')
        // new Trip('nantes', 'Nantes', 'img/nantes.jpg')
        // new Trip('rio-de-janeiro', 'Rio de Janeiro', 'img/rio-de-janeiro.jpg')
        new Trip()
        this.name
        this.imageUrl

    } findByName(tripName) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // ici l'exécution du code est asynchrone
                // TODO utiliser resolve et reject en fonction du résultat de la recherche
                request(`http://localhost:8090/trip/${tripName}`, {}, (err, response) => {
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
            }, 2000)
        });
    }
}
class PriceService {
    constructor() {
        // TODO Map of 2 trips
        // 'paris' --> price == 100
        // 'rio-de-janeiro' --> price == 800)
        // no price for 'nantes'
        this.id
        this.price
    }
    findPriceByTripId(tripId) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // ici l'exécution du code est asynchrone
                // TODO utiliser resolve et reject en fonction du résultat de la recherche
                request(`http://localhost:8090/trip/${tripId}`, {}, (err, response) => {
                    // callback(id); plus d'utilisation de callback
                    // gestion des erreurs
                    if (err) {
                        reject(`No trip for id ${id}`);
                        // en cas d'erreur
                    }
                    else {
                        resolve(JSON.parse(response.body));
                        // en cas de succès
                    }
                });
            }, 2000)
        });
    }
}

const serviceTrip = new TripService();
const servicePrice = new PriceService();

let setTrips = new Set();
let mapTrips = new Map();

serviceTrip.findByName("paris").then(
    (data) => {
        //resolve
        //console.log(data)
        return findT(data.id) //retourne un promise par le resolve callback
    },
    (reject) => console.log(reject) //retour du promise par reject callback
).then( // Excécute le contenu du promise

    (trips) => {
        trips.forEach(trip => {
            setTrips.add(trip)
            console.log(`Trip found : Trip {id: ${trip.id}, name: ${trip.name}, imageUrl: ${trip.imageUrl}}`)
        });

    }
)
    .catch(err => console.log(err));
