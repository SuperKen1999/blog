const express = require('express');
var app = express();
var router = express.Router();

const mysql = require('mysql');
const ejs = require('ejs');
const consolidate = require('consolidate');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const secret = "123456789"


app.set('view engine', 'html');
app.set('views', './views');
app.engine('html', consolidate.ejs);

var db = mysql.createPool({
    host: "localhost",
    user: 'root',
    password: "32167582",
    database: "blog"
})
var blog_data=[{
        id: 1,
        blog_id: 1001,
        user: 'aaa',
        time: '2019年4月5日 18:10',
        content: "1001-答应我高低压唯一的外回个电话外呼渡口啊呜厚度为卡号地挖苦和杜瓦客户"
    },
    {
        id: 2,
        blog_id: 1002,
        user: 'bbb',
        time: '2019年4月5日 18:10',
        content: "1002-答应我高低压唯一的外回个电话外呼渡口啊呜厚度为卡号地挖苦和杜瓦客户"
    },
    {
        id: 5,
        blog_id: 1005,
        user: 'ccc',
        time: '2019年4月5日 18:10',
        content: "1005-答应我高低压唯大家晚安多久啊我不挖得几乎开挖后哇大王会断网一的外回个电话外呼渡口啊呜厚度为卡号地挖苦和杜瓦客户"
    },
    {
        id: 211,
        blog_id: 1211,
        user: 'ddd',
        time: '2019年4月5日 18:10',
        content: "1211-答应我高低压唯一的外回个电话外呼渡口啊呜厚度为卡号地挖苦和杜瓦客户"
    },
    {
        id: 999,
        blog_id: 1999,
        user: 'eee',
        time: '2019年4月5日 18:10',
        content: "1999-答应我高低压唯一的外回个电话外呼渡口啊呜厚度为卡号地挖苦和杜瓦客户"
    },
    {
        id: 456,
        blog_id: 1456,
        user: 'fff',
        time: '2019年4月5日 18:10',
        content: "1456-答应我高低压唯一的外回个电话外呼渡口啊等我哈v都会被哇大文件都不会挖宝的话挖宝的好哇阿文低洼好哇阿文阿文呜厚度为卡号地挖苦和杜瓦客户"
    },
    {
        id: 2434,
        blog_id: 3434,
        user: 'dawdaw ',
        time: '2019年4月5日 18:10',
        content: "3434-答应我高低压唯一的外回个电话外呼渡口啊呜厚度为卡号地挖苦和杜瓦客户"
    },
    {
        id: 8098,
        blog_id: 9098,
        user: 'wad awd aw wad',
        time: '2019年4月5日 18:10',
        content: "9098-答应我高低压唯一的外回个电话外呼渡口啊呜厚度为卡号地挖苦和杜瓦客户"
    },
]
router.get('/:blog_id', (req, res) => {
    var position = `http://localhost:8080${req.originalUrl}`;
    res.cookie('position', position);
    var {
        blog_id
    } = req.params;
    var send_data;
    for(var item of blog_data){
        if(item.blog_id==blog_id){
            send_data=item;
        }
    }
    jwt.verify(req.cookies.token, secret, function (err, data) {
        if (err) {
            res.render('./blog/blog.ejs', {
                username: "",
                send_data
            })
            return;
        }
        res.render('./blog/blog.ejs', {
            username: data.username,
            send_data
        })
    })
})

module.exports = router;