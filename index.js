/**
 * Chargement du module express dans la letiable let express
 */
let express = require("express");
/**
 * chargement de l'objet express dans la letiable app
 */
let app = express();

/**
 * configuration l'architecture REST JSON avec
 * les droits les mappings (les accés de notre serveur d'application )
 */
//Middleware
app.use(express.json())
/**
 * Configuration des headers pour donner les accés aux différentes actions HTTP
 * GET POST PUT DELETE ....
 */
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/**
 * Chargement en mémoire de données JSON (un tableau JSON)
 */
const parkings = require('./parkings.json')
const reservations = require('./reservations.json')
const trip = require('./trip.json')
/**
 * Mapping get uri:/parkings
 * on a un callback qui envoie au client web 
 * status 200 : OK
 * je lui envoie en même temps le flux JSON des parkings
 * on est en mode asynchrone
 */
app.get('/parkings', (req, res) => {
    res.status(200).json(parkings)
})

app.get('/reservations', (req, res) => {
    res.status(200).json(reservations)
})
app.get('/trip', (req, res) => {
    res.status(200).json(reservations)
})
/**
 * Mapping get uri:/parkings/:id/reservations
 * :id un pathletiable
 * on a un callback qui envoie au client web 
 * status 200 : OK
 * je lui envoie en même temps le flux JSON on envoie
 * les réservations correspondantes à l':id du parking
 * on est en mode asynchrone
 */
app.get('/parkings/:id/reservations', (req, res) => {
    //On parse l'id en entier
    const id = parseInt(req.params.id)
    //j'utilise la méthode filter pour récupérer les réservations du n° de parking
    // === même type et même valeur
    const preservations = reservations.filter(
        reservation => reservation.parkingId === id)
    res.status(200).json(preservations)
})

app.get('/parkings/:id/reservations/:idreservation', (req, res) => {
    const id = parseInt(req.params.id)
    const idreservation = parseInt(req.params.idreservation)
    /**
     * j'ai un filtre sur plusiers conditions
     * je suis obligé d'utiliser des closures {}
     * et de retourner un booléen true ou false
     * pôur l'ajouter ou non dans le tableau preservations
     */
    const preservations = reservations.filter(
        reservation => {
            if ((reservation.parkingId === id) &&
                (reservation.id === idreservation))
                return true
            else
                return false
        })
    res.status(200).json(preservations)
})

app.get('/parkings/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const parking = parkings.find(parking => parking.id === id)
    res.status(200).json(parking)
})
/**
 * delete (http) avec le mapping : /parkings/:id/reservations/:idreservation
 * et on supprime la réservation :idreservation et aussi selon l':id du parking
 */
app.delete('/parkings/:id/reservations/:idreservation', (req, res) => {
    const id = parseInt(req.params.id)
    const idreservation = parseInt(req.params.idreservation)
    /**
     * j'utilise la méthode find pour avoir un seul résultat.
     */
    let reservation = reservations.find(
        reservation => {
            if ((reservation.parkingId === id) &&
                (reservation.id === idreservation))
                return true
            else
                return false
        })
        /**
         * supprimer un indice dans un tableau 
         * par la méthode splice et l'utilisation de indexOf pour supprimer la bonne
         * ligne.
         */
    reservations.splice(reservations.indexOf(reservation), 1)
    //On  retourne le tablea JSON modifié des réservations
    res.status(200).json(reservations)
})
/**
 * Mise à jour d'une réservation à un n° de parking
 * le verbe put (http) : mapping /parkings/:id/reservations/:idreservation
 * je mets à jour la réservation correspondante
 */
app.put('/parkings/:id/reservations/:idreservation', (req, res) => {
    const id = parseInt(req.params.id)
    const idreservation = parseInt(req.params.idreservation)
    let reservation = reservations.find(
        reservation => {
            if ((reservation.parkingId === id) &&
                (reservation.id === idreservation))
                return true
            else
                return false
        })
        //Si différent de undefined ou null
        //alors je peux récupérer les données JSON envoyer avec l'instruction put
        //je récupére les données JSON dans l'objet body et j'utilise les propiétés
        //JSON correspondant à la fiche réservation JSON
    if (reservation) {
        reservation.id = req.body.id
        reservation.clientName = req.body.clientName
        reservation.vehicle = req.body.vehicle
        reservation.licensePlate = req.body.licensePlate
        reservation.checkin = req.body.checkin
        reservation.checkout = req.body.checkout
        reservation.ok = req.body.ok
        //Utilisation du forEach pour affecter la bonne réservation 
        reservations.forEach(data => {
            if (data.id === reservation.id && reservation.parkingId == data.parkingId) {
                data = reservation
            }
        }
        )
    }
    //Je renvoie toutes mes réservations avec la mise à jour
    res.status(200).json(reservations)
})
/**
 * POST AJOUT 
 * verbe post (http) mapping : /parkings/:id/reservations
 */
app.post('/parkings/:id/reservations', (req, res) => {
    const id = parseInt(req.params.id)
    const parking = parkings.find(parking => parking.id === id)
    //initialisation d'un flux JSON vide
    let reservation = {}
    reservation.parkingId = parking.id
    reservation.parking = parking.name
    reservation.city = parking.city
    reservation.id = req.body.id
    reservation.clientName = req.body.clientName
    reservation.vehicle = req.body.vehicle
    reservation.licensePlate = req.body.licensePlate
    reservation.checkin = req.body.checkin
    reservation.checkout = req.body.checkout
    reservation.ok = req.body.ok
    //add de la nouvelle réservation
    //dans le tableau reservations
    reservations.push(reservation)
    //Je renvoie toutes mes réservations
    //avec la nouvelle ligne
    res.status(200).json(reservations)
})

app.post('/parkings', (req, res) => {
    parkings.push(req.body)
    res.status(200).json(parkings)
})



app.put('/parkings/:id', (req, res) => {
    const id = parseInt(req.params.id)
    let parking = parkings.find(parking => parking.id === id)
    parking.name = req.body.name
    parking.city = req.body.city
    parking.type = req.body.type
    res.status(200).json(parking)
})

app.delete('/parkings/:id', (req, res) => {
    const id = parseInt(req.params.id)
    let parking = parkings.find(parking => parking.id === id)
    parkings.splice(parkings.indexOf(parking), 1)
    res.status(200).json(parkings)
})


/**
 * app écoute le port 8080
 * pour exécuter à la demande d'un futur client web
 * le mapping correspondant
 */
app.listen(8090, () => {
    console.log("Serveur à l'écoute !")
});