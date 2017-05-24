var express = require('express');
var db = require('../models');

var router = express.Router();

router.get('/', function(req, res) {
    db.burger.findAll({}).then(function(data) {
        var hbsObject = {
            burgers: data
        };
        res.render('index', hbsObject);
    });
});

router.post('/', function(req, res) {
    db.burger.create({
        burger_name: req.body.burger_name
    }).then(function() {
        res.redirect('/');
    });
});

router.put('/:id', function(req, res) {
    var condition = 'id = ' + req.params.id;

    db.burger.update({
        devoured: req.body.devoured
    }, {
        where: {
            id: req.params.id
        }
    }).then(function() {
        res.redirect('/');
    });
});

module.exports = router;
