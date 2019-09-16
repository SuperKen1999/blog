const express = require('express');
const ejs=require('ejs');
const consolidate=require('consolidate');
const mysql=require('mysql');
const cookieParser=require("cookie-parser");
const jwt=require('jsonwebtoken');
const secret="123456789";

var app = express();
app.listen(8080, function () {
    console.log("http://localhost:8080/")
})

app.use(express.static('./public'));
app.use(cookieParser());

//consolidate
app.set('view engine','html');// 将html设置为默认扩展
app.set('views','./views');// 指定模版文件位置
app.engine('html',consolidate.ejs);// 指定将ejs文件渲染成html文件

var db=mysql.createPool({host:"localhost",user:'root',password:"32167582",database:"blog"})

app.get('/',(req,res)=>{
    var position=`http://localhost:8080${req.originalUrl}`;
    res.cookie('position',position);
    var homeInit={};
    jwt.verify(req.cookies.token, secret, function (err, data) {
        if (err) {
            homeInit.login=false;
            return;
        }
        homeInit.login=true;
        homeInit.user=data.username;
    })
    homeInit.blog_data=[
        {id:1,blog_id:1001,user:'aaa',time:'2019年4月5日 18:10',content:"dwadwadwad答应我高低压唯一的外回个电话外呼渡口啊呜厚度为卡号地挖苦和杜瓦客户"},
        {id:2,blog_id:1002,user:'bbb',time:'2019年4月5日 18:10',content:"dwadwadwad答应我高低压唯一的外回个电话外呼渡口啊呜厚度为卡号地挖苦和杜瓦客户"},
        {id:5,blog_id:1005,user:'ccc',time:'2019年4月5日 18:10',content:"dwadwadwad答应我高低压唯大家晚安多久啊我不挖得几乎开挖后哇大王会断网一的外回个电话外呼渡口啊呜厚度为卡号地挖苦和杜瓦客户"},
        {id:211,blog_id:1211,user:'ddd',time:'2019年4月5日 18:10',content:"dwadwadwad答应我高低压唯一的外回个电话外呼渡口啊呜厚度为卡号地挖苦和杜瓦客户"},
        {id:999,blog_id:1999,user:'eee',time:'2019年4月5日 18:10',content:"dwadwadwad答应我高低压唯一的外回个电话外呼渡口啊呜厚度为卡号地挖苦和杜瓦客户"},
        {id:456,blog_id:1456,user:'fff',time:'2019年4月5日 18:10',content:"dwadwadwad答应我高低压唯一的外回个电话外呼渡口啊等我哈v都会被哇大文件都不会挖宝的话挖宝的好哇阿文低洼好哇阿文阿文呜厚度为卡号地挖苦和杜瓦客户"},
        {id:2434,blog_id:3434,user:'dawdaw ',time:'2019年4月5日 18:10',content:"dwadwadwad答应我高低压唯一的外回个电话外呼渡口啊呜厚度为卡号地挖苦和杜瓦客户"},
        {id:8098,blog_id:9098,user:'wad awd aw wad',time:'2019年4月5日 18:10',content:"dwadwadwad答应我高低压唯一的外回个电话外呼渡口啊呜厚度为卡号地挖苦和杜瓦客户"},
    ]
    res.render('./home/home.ejs',{homeInit});
});
app.use('/user',require('./routers/user'));
app.use('/accont',require('./routers/accont'));
app.use('/blog',require('./routers/blog'));
app.use('/control',require('./routers/control'));