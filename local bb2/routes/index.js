const register = require('../controllers/registerUser.controller')
const login = require('../controllers/login.controller')
const resetPassword = require('../controllers/resetPassword.controller')
const showListAccount = require('../controllers/showListAccount.controller')
const loginAdmin = require('../controllers/loginAdmin')
const createCv  = require('../controllers/createdCv.controllers')
const upload = require('../middleware/uploadMiddleware')
const express = require('express')
const registerAdmin = require('../controllers/registerADmin')
const download = require('../controllers/download.controller')
const checkByDay = require('../controllers/checkByDay')
const model = require('../models/dbPostgreSQL');
const { user } = require('../config/postgreSQL/postgreSQL')
const db = new model()

function route(app){
app.get('/',function(req, res){ 
  res.render('home',{
    layout: false
  })
}),
app.get('/admin/listaccount',function(req, res){
  res.render('account/list')
}),
app.get('/login', function(req, res){
  res.render('login',{
    layout: false
  })}),
app.post('/login',login),
app.get('/home', (req, res)=>{
  res.render('user')
})

app.get('/user',(req,res)=>{
    res.render('user')
})
app.post('/loginadmin',loginAdmin),

app.get('/loginadmin', function (req, res) { 
    res.render('loginadmin',{
      layout: false
    })
 })
app.get('/admin',function (req, res) {
  db.admin((users,cv,downloaded,userTable)=>{
      res.render('admin',{
        layout: false,
        users: users,
        cvcreated: cv,
        downloaded: downloaded,
        userTable :  userTable
    });
  })
  })
  app.get('/register',function (req, res) {
    res.render('register',{
      layout: false
    })
  })

app.post('/register', register),
app.get('/registeradmin',function(req, res){
  res.render('registerAdmin',{
    layout: false
  })
})
app.post('/registeradmin',registerAdmin)
app.post('/resetpassword', resetPassword)

app.get('/createcv',(req, res)=>{
  res.render('createCV',{
    layout: false
  })
}),
app.post('/createcv/:id',upload.single('link_img'),createCv)

app.get('/download',download)

app.get('/user/:id',function(req, res){
  db.getName(req.params,function(user_name){
        res.render('user',{
          user_name: user_name
        })
  })
}),
app.get('/checkbyday',checkByDay)

}


module.exports = route;
