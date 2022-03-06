let connexion = require('../config/db')
let moment = require('../config/moment')
var momentTz = require('moment-timezone');

class LoginModel{

    static connect(identifiant, password, cb){

        connexion.query("SELECT * FROM visiteur WHERE login1 = ? AND mdp = ? LIMIT 1", [identifiant, password], (err, result) =>{
            if(err) throw err
            if( result[0] === undefined){
                return cb(false)
            }else{
                return cb(result)
            }
        })
    }
}

module.exports = LoginModel