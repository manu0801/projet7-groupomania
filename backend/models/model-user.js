const { DataTypes, Model } = require('sequelize');
const sequelize = require("./index.js");


class User extends Model {}

User.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false 
    }

},
{
    sequelize,
    modelName: "User",
    tableName: 'users',
    timestamps: false
});
module.exports=User;





