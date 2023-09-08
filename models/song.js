const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');

songs.init(
    {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        artist: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        song_id: {
            type: DataTypes.INTEGER,
        }
    },
    sequelize,
)

module.exports = songs;