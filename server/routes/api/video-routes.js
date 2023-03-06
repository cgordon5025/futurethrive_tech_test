const router = require('express').Router();

const {
    saveVideo
} = require('../../controllers/videoController')

router.route('/').post(saveVideo)

module.exports = router