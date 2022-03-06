let express = require("express")
let session = require("express-session")
let flash = require("./middlewares/flash.js")

let moment = require('./config/moment')
const { response } = require("express")


let app = express()

app.use('/assets', express.static('public'))

app.use(express.urlencoded({ extended: false})) //Utilisé pour receptionné les donnée d'un formulaire
app.use(express.json())
app.use(session({   //Param des  sessions
    secret: 'cleechiffrement',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
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
    response.render("./layout/home")
})

app.post("/home", (request, response) => {

    let HomeController = require('./controllers/home-controller')
    HomeController.send_value(request, response)
})


app.listen(80)