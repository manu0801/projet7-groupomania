const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/controller-user');
const multer = require('../middleware/multer-config');

router.post('/signup', authCtrl.signup);
router.post('/login', authCtrl.login);
router.get('/:id', authCtrl.findOneUser);
router.put('/:id', multer, authCtrl.modifyUser);

module.exports = router;