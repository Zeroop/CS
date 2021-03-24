const model = require('../models/dbPostgreSQL');
const jwt = require('jsonwebtoken');
const fs = require('fs')
const path = require("path");

var db = new model()

function showListAccount (req, res){
      const entity = [...req.body]
      db.showListAccount(entity,function(result){
        
      })
}

module.exports = showListAccount;
