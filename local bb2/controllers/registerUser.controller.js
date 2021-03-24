var model = require('../models/dbPostgreSQL');
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const fs = require('fs');
var path = require('path');
var  privateKeyFolder = path.join(path.resolve("./")+'/key/bbcv.key');
var RSA_PRIVATE_KEY = fs.readFileSync(privateKeyFolder);

var db = new model();

function register(req, res){
    
    var hash = bcrypt.hashSync(req.body.password, 8);
    const entity = {...req.body}
    entity.password = hash;
    entity.role = 1;
    db.checkExistForRegister(entity, (result,role) => {
       if (result) {
          db.register(entity, (user_id) => {
          var token = jwt.sign({user_id: user_id }, RSA_PRIVATE_KEY, {algorithm:'RS256'})
          res.render('login',{
            message : 'Register successfully,you can login now !!',
            user_id : user_id,
            layout: false
          })
          
        });  
      } else {
        res.render('register',{
          message: 'Exist User',
          layout: false
        })
      }  
    });   
}

module.exports = register;
