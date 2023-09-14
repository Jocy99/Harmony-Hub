const router = require('express').Router();
const { User, Playlist, Song } = require('../../models');

router.post('/', async (req, res) => {

  try {
    console.log("REQUEST BODY", req.body);
    const userData = await User.create(req.body);
    console.log("USER DATA", userData);
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    console.log("USER SIGN UP ERROR", err);
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.user_name = userData.name;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.post('/addSong', async (req, res) => {
  console.log("Incoming Data: ", req.body);

  const userPlaylist = await Playlist.findOne({
    where: {
      user_id: req.session.user_id
    }
  });

  const { title, artistName, albumTitle } = req.body;

  const playlistSong = await Song.create({
    title: title,
    artist: artistName,
    album: albumTitle,
    playlist_id: userPlaylist.id
  });

  console.log('user playlist', userPlaylist);
  // What should we query our DB for FIRST(?)
  // We should have the USER_ID from the REQUEST SESSION OBJECT
  // --> Query for the current USER (based on the req.session.userId)
  // --> update sequelize method (song data --> User.playlist)
  //build playlist under USERs.js
  //res.redirect('/')  // redirect to endpoint that present VIEW

  res.status(200).json(playlistSong);
})

module.exports = router;
