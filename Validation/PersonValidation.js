const { check } = require('express-validator');
var mongoose = require('mongoose');

exports.PersonPost = [
    check("name").isLength({min:1}),
    check("lastName").isLength({min:1}),
    check("birthDate").matches(/^[0-9]{4}-[0-9]{2}-[0-9]{2}( [0-9]{2}:[0-9]{2}:[0-9]{2})?$/),
    check("gender").isLength({min:1}),
    check("email").isEmail(),
    check("password").isLength({min:1})
];

exports.PersonGetById = [
    check("id").isLength({min:24})
];

exports.PersonGetByName = [
    check("name").isLength({min:1})
];

exports.PersonGetByEmail = [
    check("name").isEmail()
];

exports.PersonPut = [
    check("id").isLength({min:24}),
    check("name").isLength({min:1}),
    check("lastName").isLength({min:1}),
    check("birthDate").matches(/^[0-9]{4}-[0-9]{2}-[0-9]{2}( [0-9]{2}:[0-9]{2}:[0-9]{2})?$/),
    check("gender").isLength({min:1})
];