const router = require('express').Router();

const {
    saveVideo,
    uploadVideo
} = require('../../controllers/videoController')

router.route('/').post(uploadVideo)
router.route('/:filename').post(saveVideo)

module.exports = router