bodyParser = require('body-parser')
var fs = require('fs')
var path = require('path')
//previously app.use(pdf())
var wkhtmltopdf = require('wkhtmltopdf');
function download (req,res){
    wkhtmltopdf('http://localhost/create/:id', { output: 'cs.pdf' });
}


module.exports = download;