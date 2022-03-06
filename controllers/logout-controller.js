class LogoutController{

    static logout(request, response){
        request.session.login = undefined
        request.flash('succes', "Vous avez bien été déconnecté")
        response.redirect("/")
    }
}

module.exports = LogoutController