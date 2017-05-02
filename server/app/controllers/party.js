var Party = require('../models/party');
var request = require("request");

exports.getParties = function(req, res, next){
    Party.find(function(err, data) {
        if (err){
            res.send(err);
        }
        res.json(data);
    });
}

exports.startQuiz = function(req, res, next){
    //start quiz
    res.send("loo");
}

exports.answareQuiz = function(req, res, next){
    Quiz.find(function(err, quiz) {
        if (err){
            res.send(err);
        }
        console.log(quiz);
        res.json(quiz);
    });
}

exports.createParty = function(req, res, next){
    Party.create({
        name : req.body.name,
        password : req.body.password
    }, function(err, party) {
        if (err){
            res.send(err);
        }
        Party.find({
            name : req.body.name,
            password : req.body.password
        }, function(err, party) {
            if (err){
                res.send(err);
            }
            res.json(party);
        });
    });
}

exports.deleteQuiz = function(req, res, next){
  //TODO ska nog inte finnas med
    Quiz.remove({
        _id : req.params.quiz_id
    }, function(err, quiz) {
        res.json(quiz);
    });
}
