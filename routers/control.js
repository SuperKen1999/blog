const express = require('express');
var app = express();
var router = express.Router();

const mysql = require('mysql');
const ejs = require('ejs');
const consolidate = require('consolidate');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const secret = "123456789"
const bodyParser=require('body-parser');

router.use(bodyParser.urlencoded({
    extended:true
}))
router.use(bodyParser.json())

app.set('view engine', 'html');
app.set('views', './views');
app.engine('html', consolidate.ejs);

var db = mysql.createPool({
    host: "localhost",
    user: 'root',
    password: "32167582",
    database: "blog"
})

router.post('/writeBlog', (req, res) => {
    console.log(req.body)
    res.send('get it!')
})

module.exports = router;