const router = require('express').Router();
const userRoutes = require('./userRoutes');
const musicRoutes = require('./musicRoutes');
const projectRoutes = require('./projectRoutes');
const playlistRoutes = require('');

router.use('/users', userRoutes);
router.use('/music', musicRoutes);

router.use('/projects', projectRoutes);

module.exports = router;
