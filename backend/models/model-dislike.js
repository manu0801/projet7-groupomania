"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class dislike extends Model {
        static associate(models) {
            models.dislike.belongsTo(models.model-publication);
            models.dislike.belongsTo(models.model-User);
        }
    }
    dislike.init(
        {
            UserId: {
                type: DataTypes.INTEGER,                
            },
            PublicationId: {
                type: DataTypes.INTEGER,
            },
        },
        {
            sequelize,
            modelName: "Dislike",
            tableName: "likedislike"
        }
    );
    return dislike;
}