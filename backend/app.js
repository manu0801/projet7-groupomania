const express = require('express');
const app = express();
const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('groupomania', 'root', '#Marie2117', {
    dialect: 'mysql',
    host: 'localhost'
});
async function test(){
    try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    } catch (error) {
    console.error('Unable to connect to the database:', error);
    }
}
test();




app.use((req, res, next) => {
    console.log('requete reçu');
    next();
});

app.use((req, res, next) => {
    res.status(201);
    next();
});

app.use((req, res, next) => {
    res.json ({message: 'requete reçu'});
    next();
});

app.use((req, res) => {
    console.log('reponse envoyé avec succès');
});


module.exports = app;