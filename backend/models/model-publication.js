const { DataTypes, Model } = require('sequelize');
const sequelize = require("./index.js");


class Publication extends Model {}

Publication.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    publication: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    author_id: {
        type: DataTypes.INTEGER,
        allowNull: false 
    }

},
{
    sequelize,
    modelName: "Publication",
    tableName: 'publications',
    timestamps: false
});
module.exports=Publication;
