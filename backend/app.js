const express = require('express');
const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

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

app.post('/api/stuff', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
        message: 'publication créée'
    });
})

app.get('/api/stuff', (req, res, next) => {
    const stuff = [
    {
        _id: 'oeihfzeoi',
        title: 'Ma premiere publication',
        description: 'Le contenu de ma 1ère publication',
        imageUrl: '',
        userId: 'qsomihvqios',
    },
    {
        _id: 'oeihfzeomoihi',
        title: 'Ma deuxième publication',
        description: 'Le contenu de ma 2ème publication',
        imageUrl: '',
        userId: 'qsomihvqios',
    },
    ];
    res.status(200).json(stuff);
});


module.exports = app;