const User = require('./User');
const Song = require('./song');
const Playlist = require('./Playlist');

User.hasOne(Playlist, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Playlist.hasMany(Song, {
    foreignKey: 'playlist_id',
    onDelete: 'CASCADE'
});

Song.belongsTo(Playlist, {
    foreignKey: 'playlist_id'
});

Playlist.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Song, Playlist };
