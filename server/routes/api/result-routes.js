const router = require('express').Router();

const {
    saveAnswers
} = require('../../controllers/resultController')

router.route('/').post(saveAnswers)

module.exports = router