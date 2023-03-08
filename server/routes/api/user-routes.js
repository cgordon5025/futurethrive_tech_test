const router = require('express').Router();

const {
    createUser,
    getUsers
} = require('../../controllers/userController')

router.route('/').post(createUser).get(getUsers)

module.exports = router