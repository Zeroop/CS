var model = require('../models/dbPostgreSQL');
const jwt = require('jsonwebtoken');
const fs = require('fs')
var path = require("path");
var  privateKeyFolder = path.join(path.resolve("./")+'/key/bbcv.key')
var RSA_PRIVATE_KEY = fs.readFileSync(privateKeyFolder);
var db = new model()

function login(req, res,next){
    const entity = {...req.body}
    db.checkLogin(entity, function (user_id, role) {
        if(role==1){
            var token = jwt.sign({user_id: user_id }, RSA_PRIVATE_KEY, {algorithm:'RS256'})
            res.redirect('/user/'+ user_id)
        }else{
            res.render('login', {
                layout: false,
                err_message: 'Not exist user'
            })
        } 
    }) 
}

module.exports = login;
