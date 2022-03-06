class HomeController{

    static send_value(request, response){
        if (request.body.value_price === undefined || request.body.value_price === '') {
            request.flash('error', "Vous n'avez pas inseré de valeur")
            response.redirect("/home") 
        }else{

            let FicheFrais = require('../models/fiche-frais-model')

            FicheFrais.send_value('a55',  escape(request.body.type_frais), escape(request.body.value_price), () =>{

                request.flash('succes', "Le frais à bien été ajouté à votre fiche")
                response.redirect("/home") 
            })
        }
    }
}


module.exports = HomeController