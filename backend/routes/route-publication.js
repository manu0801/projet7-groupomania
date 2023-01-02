const express = require('express');
const router = express.Router();

const publicationCtrl = require('../controllers/controller-publication');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//router to create publication
router.post('/', auth, multer, publicationCtrl.createPublication);

//router to modify publication
router.put('/:id', auth, multer, publicationCtrl.modifyPublication);

//router to delete publication
router.delete('/:id', auth, publicationCtrl.deletePublication );

//router to select one publication
router.get('/:id', auth, publicationCtrl.getOnePublication);

//router to see all publications
router.get('/', auth, publicationCtrl.getAllPublication);

//router to like or dislike one publication
router.post('/:id/like', auth, publicationCtrl.likeDislike);

module.exports = router;