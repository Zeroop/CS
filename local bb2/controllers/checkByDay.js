var model = require('../models/dbPostgreSQL');
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const fs = require('fs');
const { DataSync } = require('aws-sdk');


var db = new model()

function checkByDay(req,res){
    let time = new Date()
    let day = time.getDate()
    db.checkByDay(day,function(result){
            
    })
    //SELECT CURRENT_DATE 
}

module.exports = checkByDay;