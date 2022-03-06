let HistoriqueModel = require("./models/historique-model")

class HistoriqueController{

    static find_fiche(request, response, cb){
        let idVisiteur = request.session.login
        let listeMoisVisiteur = HistoriqueModel.get_month_user(idVisiteur)

    }

}


module.exports = HistoriqueController