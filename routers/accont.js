const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const mysql = require('mysql');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');

const secret = "123456789"

var router = express.Router();
//use
router.use(bodyParser.urlencoded({
    extended: true
}))
router.use(bodyParser.json());
router.use(cookieParser())

//mysql
var db = mysql.createPool({
    host: 'localhost',
    user: "root",
    password: "32167582",
    database: "blog"
})
//main
router.get('/', (req, res) => {
    if(req.headers.referer!=="http://localhost:8080/accont"){
        res.cookie('referer',req.headers.referer);
    }
    jwt.verify(req.cookies.token, secret, function (err, data) {
        if (err) {
            res.sendFile(path.resolve('./static/accont.html'))
            return;
        }
        res.redirect(req.cookies.referer);
    })
})
router.post('/login', (req, res) => {
    console.log(req.cookies);
    var {
        username,
        password
    } = req.body;
    db.query(`select * from user where username='${username}'`, function (err, data) {
        if (data.length !== 0) {
            if (data[0].password === password) {
                var payload = {
                    username,
                    admin: data[0].admin
                }
                var token = jwt.sign(payload, secret, {
                    expiresIn: '1day'
                })
                res.cookie('token', token, {
                    maxAge: 24 * 3600 * 1000
                })
                console.log()
                res.send({
                    code: 0,
                    msg: "登陆成功",
                })
            } else {
                res.send({
                    code: 1,
                    msg: "密码错误"
                })
            }
        } else {
            res.send({
                code: 1,
                msg: "没有帐户"
            })
        }
    })
})
router.post('/reg', (req, res) => {
    var {
        username,
        password
    } = req.body;
    db.query(`select * from user where username='${username}'`, function (err, data) {
        if (data.length !== 0) {
            res.send({
                code: 1,
                msg: "已经存在该用户"
            })
        } else {
            db.query(`insert into user set username='${username}',password='${password}',admin='false'`, function (err) {
                res.send({
                    code: 0,
                    msg: "注册成功"
                })
            })
        }
    })
})
router.get('/logout', (req, res) => {
    console.log('logout')
    res.cookie('token', '', {
        maxAge: -1
    })
    res.redirect(req.cookies.position)
})
router.get('/changePassword', (req, res) => {
    console.log('logout')
    res.cookie('token', '', {
        maxAge: -1
    })
    res.redirect(req.cookies.position)
})
module.exports = router;