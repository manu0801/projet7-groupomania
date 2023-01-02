const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sequelize = require("./models/index.js");

const publicationRoutes = require('./routes/route-publication');
const authRoutes = require('./routes/route-auth');


const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// const sequelize = new Sequelize('groupomania', 'root', '#Marie2117', {
//     dialect: 'mysql',
//     host: 'localhost'
// });
async function test(){
    try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    } catch (error) {
    console.error('Unable to connect to the database:', error);
    }
}
test();

app.use(bodyParser.urlencoded({extended: true}));

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/publication', publicationRoutes);
app.use('/api/auth', authRoutes);


module.exports = app;