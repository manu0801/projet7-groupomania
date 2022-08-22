const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize('sqlite::memory:');

class Publication extends Model {}
Publication.init({
    publication: {
        type: DataTypes.TEXT
    },
    publicationUrl: {
        type: DataTypes.STRING
    }
},
{
    sequelize,
    modelName: "Publication",
    tableName: 'publications'
});