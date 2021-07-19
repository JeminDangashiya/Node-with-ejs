var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var ejs = require('ejs');
var engine = require('ejs-mate');
var authRoutes = require('./router/auth');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(__dirname + '/public'));

// set the view
app.engine('ejs', engine);
app.set('view engine', 'ejs');

app.use(authRoutes)

app.listen(8082);