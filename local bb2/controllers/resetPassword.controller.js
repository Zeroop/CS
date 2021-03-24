var model = require('../models/dbPostgreSQL');
const jwt = require('jsonwebtoken');
const fs = require('fs')
var path = require("path");
var nodemailer = require("nodemailer");
var passwordResetKey = require('../key/passwordResetKey');

var db = new model()

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "testbbcvreal@gmail.com",
    pass: "calmdown",
  },
});

function forgotPassword (req, res){
  const entity = {...req.body}
  db.checkExistByEmail(entity, function (result, user_id) { 
        if(result){
          
        }else{
          res.send('Message: Not exist user')
        }
   })
}

/* 
 app.post('/sendemail',function (req,res) {
  let random =Math.floor(Math.random() * 100000) + 1;
  
  let test = req.get('')
  var mailOptions = {
    from: 'testbbcvreal@gmail.com',
    to: req.body.email,
    subject: 'Sending Email using Node.js',
    text: `${random}`
  };

  }) 
 app.get("/send", function (req, res) {
  rand = Math.floor(Math.random() * 100 + 54);
  host = req.get("host");
  link = "http://" + req.get("host") + "/verify?id=" + rand;
  mailOptions = {
    to: req.query.to,
    subject: "Please confirm your Email account",
    html:
      "Hello,<br> Please Click on the link to verify your email.<br><a href=" +
      link +
      ">Click here to verify</a>",
  };
  console.log(mailOptions);
  transporter.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error);
      res.end("error");
    } else {
      console.log("Message sent: " + response.message);
      res.end("sent");
    }
  });
});
app.get("/verify", function (req, res) {
  console.log(req.protocol + ":/" + req.get("host"));
  if (req.protocol + "://" + req.get("host") == "http://" + host) {
    console.log("Domain is matched. Information is from Authentic email");
    if (req.query.id == rand) {
      console.log("email is verified");
      res.end("<h1>Email " + mailOptions.to + " is been Successfully verified");
    } else {
      console.log("email is not verified");
      res.end("<h1>Bad Request</h1>");
    }
  } else {
    res.end("<h1>Request is from unknown source");
  }
}) */
module.exports = forgotPassword;