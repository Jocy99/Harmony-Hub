const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');

class Song extends Model {}

Song.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        artist: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        album: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        playlist_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'playlist',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'song',
    }
)

module.exports = Song;