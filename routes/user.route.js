const router = require('express').Router();
const userRepo = require('../repositories/user.repo');
const user = require('../controllers/user.ct')(userRepo);

router.post('/login', user.login);
router.post('/register', user.register);

module.exports = router;
