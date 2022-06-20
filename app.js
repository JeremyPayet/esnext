/**
 * let
 */
let favoriteCityId = "rome";
console.log(favoriteCityId);
favoriteCityId = "paris";
console.log(favoriteCityId);
/**
 * const
 */
const citiesId = ["paris", "nyc", "rome", "rio-de-janeiro"];
console.log(citiesId);
//citiesId = []; //TypeError: Assignment to constant variable.
citiesId.push("tokyo");
console.log(citiesId);
/**
 * Création d’objet
 */
function getWeather(cityId) {
    let city = cityId.toUpperCase();
    let temperature = 20;
    return { city: city, temperature: temperature };
}

const weather = getWeather(favoriteCityId);
console.log(weather);
/**
 * Affectation destructurée
 */
const { city, temperature } = weather;
console.log(city);
console.log(temperature);
/**
 * Rest operator
 */
const [parisId, nycId, ...othersCitiesId] = citiesId;
console.log(parisId);
console.log(nycId);
console.log(othersCitiesId.length);
/**
 * Classe
 */
class Trip {
    constructor(id, name, imageUrl) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
    }
    /* //Sans price
    toString() {
        return `Trip [${this.id}, ${this.name}, ${this.imageUrl}]`;
    }
    */
    //Avec price
    toString() {
        return `Trip [${this.id}, ${this.name}, ${this.imageUrl}, ${this.price}]`;
    }
    get price() {
        return this._price;
    } set price(newprice) {
        this._price = newprice;
    }
    static getDefaultTrip() {
        return new Trip("rio-de-janeiro", "Rio de Janeiro", "img/rio-de-janeiro.jpg");
    }
}

parisTrip = new Trip("paris", "Paris", "img/paris.jpg");
parisTrip.price = 100;
console.log(parisTrip);
console.log(parisTrip.name);
console.log(parisTrip.toString());
const defaultTrip = Trip.getDefaultTrip();
console.log(defaultTrip.toString());
/**
 * Héritage
 */
class FreeTrip extends Trip {
    constructor(id, name, imageUrl) {
        super(id, name, imageUrl);
        this.price = 0;
    }
    toString() {
        return "Free" + super.toString();
    }
}
const freeTrip = new FreeTrip("nantes", "Nantes", "img/nantes.jpg");
console.log(freeTrip.toString());
/**
 * Promise, Set, Map, Arrow Function
 */

let request = require("request");

class TripService {
    constructor() {
        // TODO Set of 3 trips
        this.set = new Set();
        this.set.add(parisTrip);
        this.set.add(defaultTrip);
        this.set.add(freeTrip);

    } findByName(tripName) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // ici l'exécution du code est asynchrone
                // TODO utiliser resolve et reject en fonction du résultat de la recherche
                var result = false;
                this.set.forEach(trip => {
                    if (trip.name == tripName) {
                        resolve(trip);
                        // en cas de succès
                    }
                })
                if (!result) {
                    reject(`No trip with name ${tripName}`);
                }
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
        this.map = new Map();
        this.map.set(parisTrip.id, parisTrip.price)
        this.map.set(defaultTrip.id, 800)
        this.map.set(freeTrip.id, undefined)
    }
    findPriceByTripId(tripId) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // ici l'exécution du code est asynchrone
                // TODO utiliser resolve et reject en fonction du résultat de la recherche
                if (this.map.has(tripId) && this.map.get(tripId)!== undefined) {
                    resolve(this.map.get(tripId));
                    // en cas de succès
                }
                else {
                    reject(`No price found for id ${tripId}`);
                    // en cas d'erreur
                }
            }, 2000)
        });
    }
}

const serviceTrip = new TripService();
const servicePrice = new PriceService();

serviceTrip.findByName("Paris").then(
    // Excécute le contenu du promise

    (trips) => {
        console.log(`Trip found : Trip {id: ${trips.id}, name: ${trips.name}, imageUrl: ${trips.imageUrl}}`)
        //console.log(trips);
    }
).catch(
    err => console.log(err)
);
serviceTrip.findByName("Toulouse").then(
    // Excécute le contenu du promise

    (trips) => {
        console.log(`Trip found : Trip {id: ${trips.id}, name: ${trips.name}, imageUrl: ${trips.imageUrl}}`)
        //console.log(trips);
    }
).catch(
    err => console.log(err)
);
serviceTrip.findByName("Rio de Janeiro").then(
    (trip) => {
        console.log(trip.id);
        servicePrice.findPriceByTripId(trip.id).then(
            (price) => {
                console.log(`Price found : ${price}`)
            }
        ).catch(
            err => console.log(err)
        );
    }
)
.catch(
    err => console.log(err)
);

serviceTrip.findByName("Nantes").then(
    (trip) => {
        servicePrice.findPriceByTripId(trip.id).then(
            (price) => {
                console.log(`Price found : ${price}`)
            }
        ).catch(
            err => console.log(err)
        );
    }
)
.catch(
    err => console.log(err)
);