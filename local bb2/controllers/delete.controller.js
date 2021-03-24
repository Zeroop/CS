
const model = require('../models/dbPostgreSQL');
const jwt = require('jsonwebtoken');
const fs = require('fs')
const path = require("path");

var db = new model()

function deleteById(req,res){
  let entity = [...req.body]
    db.delete(entity, function(result){
      if(result){
        res.render('home',{
          message: 'Success'
        })
      }else{
        res.send('Error')
      }
    })
}