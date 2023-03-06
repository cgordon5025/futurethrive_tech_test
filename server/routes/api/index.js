const router = require('express').Router();

const userRoutes = require('./user-routes');
const resultRoutes = require('./result-routes');
const videoRoutes = require('./video-routes')

router.use('/users', userRoutes);
router.use('/results', resultRoutes);
router.use('/videos', videoRoutes);

module.exports = router