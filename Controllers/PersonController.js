require('dotenv').config();
const { validationResult } = require('express-validator');
var PersonDAL = require("../DAL/PersonDAL");
const crypto = require('crypto');
var env = process.env;

exports.PersonCreate = function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.send("User could not be inserted!");
    } else {
        //Hash password
        var hash = crypto.createHash('sha512');
        let password = hash.update(req.body.password+env.PASSWORD_SALT, 'utf-8');
        let passwordHashed = password.digest('hex');

        let person = {
            name: req.body.name,
            lastName: req.body.lastName,
            birthDate: req.body.birthDate,
            gender: req.body.gender,
            email: req.body.email,
            password: passwordHashed,
            picture: req.body.hasOwnProperty('picture')? req.body.picture : null,
            otherPictures: req.body.hasOwnProperty('otherPictures')? req.body.otherPicture : [],
            bio: req.body.hasOwnProperty('bio')? req.body.bio : null,
            friends: req.body.hasOwnProperty('friends')? req.body.friends : [] 
        };
        let response = PersonDAL.addPerson(person);
        res.send("User successfully inserted!");
    }
}

exports.PersonGetById = function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.send("User could not be retrieved!");
    } else {
        PersonDAL.getPersonById(req.params.id)
            .then(function (response) {
                res.send(response);
            })
            .catch(function (err) {
                res.send(err);
            });
    }
}

exports.PersonGetByName = function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.send("User could not be retrieved!");
    } else {
        PersonDAL.getPersonByName(req.params.name)
            .then(function (response) {
                res.send(response);
            })
            .catch(function (err) {
                res.send(err);
            });
    }
}

exports.PersonGetByEmail = function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.send("User could not be retrieved!");
    } else {
        PersonDAL.getPersonByEmail(req.params.email)
            .then(function (response) {
                res.send(response);
            })
            .catch(function (err) {
                res.send(err);
            });
    }
}

exports.PersonUpdate = function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.send("User could not be retrieved!");
    } else {
        let person = {
            id: req.body.id,
            name: req.body.name,
            lastName: req.body.lastName,
            birthDate: req.body.birthDate,
            gender: req.body.gender,
            bio: req.body.bio,
        };

        PersonDAL.updatePerson(person)
            .then(function (response) {
                res.send(response);
            })
            .catch(function (err) {
                res.send(err);
            });
    }
}