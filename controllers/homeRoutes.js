const router = require('express').Router();
const { User, Playlist, Song } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    
    // Pass serialized data and session flag into template
    res.render('homepage', {

      logged_in: req.session.logged_in,
      user_name: req.session.user_name,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [
        { 
          model: Playlist,
            include: [{
              model: Song
            }]
        }
      ],
    });
    const user = userData.get({ plain: true });
console.log(user)
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

module.exports = router;
