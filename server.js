var express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var db = require('./models');

var port = process.env.PORT || 3000;

var app = express();

app.use(express.static(process.cwd() + "/public"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(methodOverride("_method"));

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var routes = require("./controllers/burgers_controller.js");

app.use("/", routes);

db.sequelize.sync({}).then(function() {
    app.listen(port, function() {
        console.log('app listening on port ' + port);
    });
});
