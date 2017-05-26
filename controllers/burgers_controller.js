var express = require('express');
var db = require('../models');

var router = express.Router();

router.get('/', function(req, res) {
    db.burger.findAll({ include: [db.customer] }).then(function(data) {
        var hbsObject = {
            burgers: data
        };
        res.render('index', hbsObject);
        // res.json(data);
    });
});

router.post('/', function(req, res) {
    db.customer.create({
        customer_name: req.body.customer_name
    }).then(function(data) {
        db.burger.create({
            burger_name: req.body.burger_name,
            customerId: data.dataValues.id
        }).then(function(data) {
            res.redirect('/');
        });
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
