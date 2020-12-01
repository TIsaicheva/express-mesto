const router = require('express').Router();
const { getUsers, getUSerProfile } = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/:id', getUSerProfile);

module.exports = router;
