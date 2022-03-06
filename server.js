let express = require("express")
let session = require("express-session")
let flash = require("./middlewares/flash.js")

let moment = require('./config/moment')


let app = express()

app.use('/assets', express.static('public'))

app.use(express.urlencoded({ extended: false})) //Utilisé pour receptionné les donnée d'un formulaire
app.use(express.json())
app.use(session({   //Param des  sessions
    secret: 'cleechiffrement',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, }
}))
app.use(require('./middlewares/flash.js'))

app.set('view engine', 'ejs')



// Partie login
app.get("/", (request, response) =>{
    response.render("./layout/login")
})

app.post("/", (request, response) =>{
    let LoginController = require('./controllers/login-controller')
    LoginController.login(request, response)
})



// Partie Fiche frais
app.get("/home", (request, response) =>{
    if(typeof request.session.login == "string"){
        response.render("./layout/home")
    }else{
        request.flash('error', "Vous devez vous connecter pour acceder à cette page")
        response.redirect("/")
    }
})


app.post("/home", (request, response) => {
    if(typeof request.session.login == "string"){
        let HomeController = require('./controllers/home-controller')
        HomeController.send_value(request, response)
    }else{
            request.flash('error', "Vous devez vous connecter pour acceder à cette page")
            response.redirect("/")
        }
})


//Historique
app.get("/historique", (request, response) =>{
    if(typeof request.session.login == "string"){

        let HistoriqueModel = require('./models/historique-model') 
        HistoriqueModel.get_month_user(request.session.login, (result) =>{
            allUserMonth = []
            for (let i = 0; i < result.length; i++) {
                allUserMonth.push(result[i].mois)
            }

            response.render("./layout/historique",  {allUserMonth: allUserMonth})
        })

    }else{
            request.flash('error', "Vous devez vous connecter pour acceder à cette page")
            response.redirect("/")
        }
})


// Déconnexion

app.get("/logout", (request, response) =>{
    let Logout = require('./controllers/logout-controller')
    Logout.logout(request, response)
})


app.listen(80)