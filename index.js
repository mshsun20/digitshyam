const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser')
const session = require('express-session')


const app = express()

// env vars
const port = 5050
const host = 'localhost'
const user = process.env.USER || 'root'
const password = process.env.PASSWORD || ''
const database = process.env.DATABASE || 'digitshmdb'

// middlewares
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use(session({
    secret:'FH46jqYdqm76cg80',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000*60*2
    }
}))


// db
const conn = mysql.createConnection({host, user, password, database, multipleStatements: true})
conn.connect((err) => {
    if (err) {
        console.log(`DB Connection Error !!!`)
    }
    else {
        console.log('Successfully Connected to Database ...')
    }
})


// routes
app.get('/home', (req, res) => {
    if (req.session.usernm) {
        // req.session.usernm++
        res.json({message:`Already logged In.`, statuscode:201})
    }
    else {
        // req.session.usernm=1
        res.json({message:`Not Yet Logged In.`, statuscode:301})
    }
})

app.post('/login', (req, res) => {
    const {acc_email, acc_pass} = req.body
    const sql = `select * from account where acc_email=? and acc_pass=?`
    conn.query(sql, [acc_email, acc_pass], (err, result) => {
        if (err) {
            res.json({error: err, statuscode:401})
        }
        if (result) {
            req.session.usernm = 12
            res.json({success:`Successfully Logged In.`, statuscode:200, data:req.session.usernm})
        }
        else {
            res.json({error:`Failed to Log In.`, statuscode:402})
        }
    })
})


// ping
app.listen(port, host, (req, res) => {
    console.log(`Server is Online at http://${host}:${port}`)
})
