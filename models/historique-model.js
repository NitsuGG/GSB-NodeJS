let connexion = require('../config/db')
let moment = require('../config/moment')
var momentTz = require('moment-timezone');

class HistoriqueModel{

    static get_month_user(idVisiteur, cb){
        connexion.query("SELECT `mois` FROM `fichefrais` WHERE idVisiteur = ?", [idVisiteur], (err, result) => {
            if(err) throw err
            cb(result)
        })
    }
}


module.exports = HistoriqueModel