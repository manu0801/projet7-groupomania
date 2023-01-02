"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class like extends Model {
        static associate(models) {
            models.like.belongsTo(models.model-publication);
            models.like.belongsTo(models.model-User);
        }
    }
    like.init(
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
            modelName: "Like",
            tableName: "likedislike"
        }
    );
    return like;
}