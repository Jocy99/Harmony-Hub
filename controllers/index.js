const router = require('express').Router();

const apiRoutes = require('./api');
// these routes show the page in views
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;
