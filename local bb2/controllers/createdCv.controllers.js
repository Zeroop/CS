const model = require('../models/dbPostgreSQL');
const jwt = require('jsonwebtoken');
const fs = require('fs')
const path = require("path");

var db = new model()



function createCV(req, res){
  const entity = {...req.body}
  entity.link_img = req.file.path
  entity.user_id = req.params.id
  db.createdCV(entity,function(cvID){
    console.log(entity.link_img)
        res.render('createdcv',{
          link_img: entity.link_img,
          layout: false
        })
  })
}

module.exports = createCV;
