require('dotenv').config();
require("./Conf");
var PersonModel = require("./PersonModel");
var mongoose = require('mongoose');

exports.addPerson = function (person) {
    //Add person to the MongoDB
    let personModel = new PersonModel({
        name: person.name,
        lastName: person.lastName,
        birthDate: person.birthDate,
        gender: person.gender,
        email: person.email,
        password: person.password,
        picture: person.picture,
        otherPictures: person.otherPicture,
        bio: person.bio,
        friends: person.friends       
    });

    personModel.save(function (err) {
        if (err) return err;
        console.log("Person Saved!")
        return true;
    });
}

exports.getPersonById = function (id) {
    return PersonModel.findById(mongoose.Types.ObjectId(id))
        .exec()
        .then(function (person) {
            return person;
        })
        .catch(function (err) {
            return err;
        });
}

exports.getPersonByName = function (name) {
    return PersonModel.find({"name": name})
        .exec()
        .then(function (person) {
            return person;
        })
        .catch(function (err) {
            return err;
        });
}

exports.getPersonByEmail = function (email) {
    return PersonModel.findOne({"email": email})
        .exec()
        .then(function (person) {
            return person;
        })
        .catch(function (err) {
            return err;
        });
}

exports.updatePerson = function (person) {
    return PersonModel.updateOne({"_id": mongoose.Types.ObjectId(person.id)},
        {"name": person.name,
        "lastName": person.lastName,
        "birthDate": person.birthDate,
        "gender": person.gender,
        "bio": person.bio
        })
        .exec()
        .then(function (person) {
            return person;
        })
        .catch(function (err) {
            return err;
        });
}