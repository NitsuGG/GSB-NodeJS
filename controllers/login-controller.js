class LoginController{

    static login(request, response){
        let identifiant  = escape(request.body.login)
        let password = escape(request.body.password)

        let LoginController = require('../models/login-model')
        LoginController.connect(identifiant, password, (result)=>{

            if (!result) {
                request.flash('error', "Identifiant ou mot de passe incorecte")
                response.redirect("/")
            }else{
                response.redirect("/home")
            }
        })
    }
    
}

module.exports = LoginController