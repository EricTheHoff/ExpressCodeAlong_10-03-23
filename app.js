// import files
import express from 'express' // web framework
import morgan from 'morgan' // better error handling
import lodash from 'lodash' // random selections
import nunjucks from 'nunjucks' // templating language
import path from 'path' // current file path
import url from 'url' // works in conjunction with path

// create my express instance
const app = express()

// setup middleware
app.use(express.json())
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
const rootDir = url.fileURLToPath(new URL('.', import.meta.url))
app.use(express.static(path.join(rootDir, 'public')))

nunjucks.configure('views', {
    autoescape: true,
    express: app
})

// endpoints/handler functions
app.get('/hello', (req, res) => res.send("Hello there."))

app.get('/', (req, res) => res.render("home.html"))

app.get('/form', (req, res) => res.render("form.html"))

app.get('/welcome', (req, res) => {
    // console.log(req.query)
    // console.log(req.body)
    // console.log(req.params)

    let {person} = req.query
    res.send(`Welcome, ${person}`)
})

app.post('/favNumber', (req, res) => {
    let {favoriteNum} = req.body
    res.send(`Your favorite number is ${favoriteNum}. This has been noted.`)
})

app.post('/users/:userColor', (req, res) => {
    // console.log(req.query)
    // console.log(req.body)
    // console.log(req.params)

    res.send(`${req.body.color} is a great favorite color!`)
})

app.get('/bridge', (req, res) => res.render("bridge.html"))

app.post('/otherSide', (req, res) => {
    console.log(req.body)

    let {name, quest, color} = req.body
    let compliments = [`Nice`, `Cool`, `Smart`]

    res.render("otherSide.html", {
        username: name,
        userQuest: quest,
        userColor: color,
        compliments
    })
})

// open server with app.listen
app.listen(4545, () => console.log(`Avengers assemble on port 4545`))