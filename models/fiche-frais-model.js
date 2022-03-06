let connexion = require('../config/db')
let moment = require('../config/moment')
var momentTz = require('moment-timezone');

class FicheFraisModel{
    
    static send_value(idVisiteur, type, value_price, cb){
        let mois = new Intl.DateTimeFormat('en-EN', { month: 'long', year: 'numeric'}).format(momentTz().tz("Europe/Paris"))
        mois = (mois.charAt(0).toUpperCase() + mois.slice(1)).replace(" ", "")
        let idvisiteur = 'j03'
        
        this.fiche_existe(idvisiteur, (result) =>{
            if (result === false) {
                this.create_fiche(idvisiteur)
            }else{

                this.GetFrais(idVisiteur, mois, type, (frais) =>{
                    value_price = parseInt(value_price) + parseInt(frais)
                    
                    connexion.query("UPDATE `lignefraisforfait` SET `quantite` = ?  WHERE `idVisiteur` = ? AND `mois` = ? AND `idFraisForfait` = ?", [value_price, idVisiteur, mois, type], (err, result) =>{
                        if(err) throw err
                    })
                })
            }
        })

        cb();
    }


    static fiche_existe(idVisiteur, cb){
        let mois = new Intl.DateTimeFormat('en-EN', { month: 'long', year: 'numeric'}).format(momentTz().tz("Europe/Paris"))
        mois = (mois.charAt(0).toUpperCase() + mois.slice(1)).replace(" ", "")

        connexion.query("SELECT * FROM `lignefraisforfait` WHERE `idVisiteur` = ? AND `mois` = ?", [idVisiteur, mois], (err, result) => {
            if(err) throw err
            if (typeof result[0] === undefined) {
                return cb(false)
            }else{
                return cb(true)
            }
        })
    }

    static create_fiche(idVisiteur){
        let mois = new Intl.DateTimeFormat('en-EN', { month: 'long', year: 'numeric'}).format(momentTz().tz("Europe/Paris"))
        mois = (mois.charAt(0).toUpperCase() + mois.slice(1)).replace(" ", "")

        // *Création de la fiche frais
        connexion.query("INSERT INTO `fichefrais` (`idVisiteur`, `mois`, `nbJustificatifs`, `montantValide`, `dateModif`, `idEtat`) VALUES(?,?,'0','0','2021-10-13','CR')", [idVisiteur, mois], (err, result) =>{
            if(err) throw err
        })

        // * Creation de toutes les lignes 
        connexion.query("INSERT INTO `lignefraisforfait` (`idVisiteur`, `mois`,`idFraisForfait`, `quantite`) VALUES (?, ?, 'ETP', 0)", [idVisiteur, mois], (err, result) =>{
            if(err) throw err
        })
        connexion.query("INSERT INTO `lignefraisforfait` (`idVisiteur`, `mois`,`idFraisForfait`, `quantite`) VALUES (?, ?, 'KM', 0)", [idVisiteur, mois], (err, result) =>{
            if(err) throw err
        })
        connexion.query("INSERT INTO `lignefraisforfait` (`idVisiteur`, `mois`,`idFraisForfait`, `quantite`) VALUES (?, ?, 'NUI', 0)", [idVisiteur, mois], (err, result) =>{
            if(err) throw err
        })
        connexion.query("INSERT INTO `lignefraisforfait` (`idVisiteur`, `mois`,`idFraisForfait`, `quantite`) VALUES (?, ?, 'REP', 0)", [idVisiteur, mois], (err, result) =>{
            if(err) throw err
        })
    }

    static GetFrais(idVisiteur, mois, idFraisForfais, cb){
        connexion.query("SELECT quantite FROM `lignefraisforfait` WHERE idVisiteur = ? AND mois = ? AND idFraisForfait = ?", [idVisiteur, mois, idFraisForfais], (err, result) =>{
            if(err) throw err
            cb(result[0].quantite)
        })
    }

}

module.exports = FicheFraisModel