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

app.use(bodyParser.urlencoded({
    extended:true
}))
app.use(bodyParser.json())

app.set('view engine', 'html');
app.set('views', './views');
app.engine('html', consolidate.ejs);

var db = mysql.createPool({
    host: "localhost",
    user: 'root',
    password: "32167582",
    database: "blog"
})

router.get('/:userid', (req, res) => {
    var position = `http://localhost:8080${req.originalUrl}`;
    res.cookie('position', position);
    jwt.verify(req.cookies.token, secret, function (err, data) {
        if (err) {
            res.redirect('http://localhost:8080/')
            return;
        }
        if (data.username !== req.params.userid) {
            res.redirect('http://localhost:8080/')
        } else {
            if (data.admin === "true") {
                res.render('./admin/admin.ejs', {
                    username: data.username
                })
            } else {
                res.render('./user/user.ejs', {
                    username: data.username
                })
            }
        }

    })
})


module.exports = router;