const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
  try {
    // Serialize data so the template can read it
    // const projects = projectData.map((project) => project.get({ plain: true }));
    
    // Pass serialized data and session flag into template
    res.render('homepage', {

      logged_in: req.session.logged_in,
      user_name: req.session.user_name,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Route to get a user's playlists
router.get('/api/user/playlists/:userId', async (req, res) => {
  try {
    const userId = req.params.userId; // Replace with actual user authentication

    // Fetch user playlists for the specified user ID
    const playlists = userPlaylists[userId];
    
    if (!playlists) {
      return res.status(404).json(console.log('User not found or has no playlists'));
    }

    // Send the playlists as JSON response
    res.status(200).json(playlists);
  } catch (error) {
    console.error(error);
    res.status(500).json(console.log('Internal server error' ));
  }
});


// Route to add a song to a user's playlist
router.post('/api/user/playlists/:userId/add-song/:playlistId', async (req, res) => {
  try {
    const userId = req.params.userId; // replace with actual user authentication
    const playlistId = req.params.playlistId;
    const songToAdd = req.body.song; // replace with the song data from the request body

    // Add the song to the user's playlist (replace with database update)
    const userPlaylist = userPlaylists[userId].find((playlist) => playlist.id === playlistId);
    
    if (!userPlaylist) {
      return res.status(404).json(console.log('Playlist not found' ));
    }
    
    userPlaylist.songs.push(songToAdd);
    
    // Send a success message
    res.status(200).json(console.log('Song added to playlist successfully' ));
  } catch (error) {
    console.error(error);
    res.status(500).json(console.log('Internal server error' ));
  }
});

// Route to get a user's playlists
router.get('/api/user/playlists/:userId', async (req, res) => {
  try {
    const userId = req.params.userId; // Replace with actual user authentication
    
    // Fetch user playlists for the specified user ID
    const playlists = userPlaylists[userId];
    
    if (!playlists) {
      return res.status(404).json(console.log('User not found or has no playlists'));
    }
    
    // Send the playlists as JSON response
    res.status(200).json(playlists);
  } catch (error) {
    console.error(error);
    res.status(500).json(console.log('Internal server error' ));
  }
});

// // Route to add a song to a user's playlist
// router.post('/api/user/playlists/:userId/add-song/:playlistId', async (req, res) => {
//   try {
//     const userId = req.params.userId; // replace with actual user authentication
//     const playlistId = req.params.playlistId;
//     const songToAdd = req.body.song; // replace with the song data from the request body
    
//     // Add the song to the user's playlist (replace with database update)
//     const userPlaylist = userPlaylists[userId].find((playlist) => playlist.id === playlistId);
    
//     if (!userPlaylist) {
//       return res.status(404).json(console.log('Playlist not found' ));
//     }
    
//     userPlaylist.songs.push(songToAdd);
    
//     // Send a success message
//     res.status(200).json(console.log('Song added to playlist successfully' ));
//   } catch (error) {
//     console.error(error);
//     res.status(500).json(console.log('Internal server error' ));
//   }
// });

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      // include: [{ model: Project }],
    });
    
    const user = userData.get({ plain: true });
    
    res.render('profile', {
      ...user,
      logged_in: true,
      user_name: req.session.user_name,
    });
  } catch (err) {
    console.log("PROFILE ERROR", err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }
  
  res.render('login');
});

// Fallback route for when a user attempts to visit routes that don't exist
router.get('*', (req, res) =>
  res.send(
    `Make a GET request using Insomnia to <a href="http://localhost:${PORT}/api">http://localhost:${PORT}/api</a>`
  )
);
module.exports = router;
