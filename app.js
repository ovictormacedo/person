require('dotenv').config();
var express = require("express"),
    bodyParser = require('body-parser');

var env = process.env;

var PersonValidation = require("./Validation/PersonValidation");
var PersonController = require("./Controllers/PersonController");

var app = express();

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies

// --------Person endpoints-------
app.post('/person', PersonValidation.PersonPost, PersonController.PersonCreate);

app.get('/person/id/:id', PersonValidation.PersonGetById, PersonController.PersonGetById);
app.get('/person/name/:name', PersonValidation.PersonGetByName, PersonController.PersonGetByName);
app.get('/person/email/:email', PersonValidation.PersonGetByEmail, PersonController.PersonGetByEmail);

app.put('/person', PersonValidation.PersonPut, PersonController.PersonUpdate);
//---------------------------------

var server = app.listen(env.PORT, function () {
    console.log('Person Service listening at '+env.PORT);
});