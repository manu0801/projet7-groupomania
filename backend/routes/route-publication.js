const express = require('express');
const router = express.Router();
const publicationCtrl = require('../controllers/publication');
const multer = require('../middleware/multer-config');

router.get('/', publicationCtrl.findAllPublications);
router.get('/users/:id', publicationCtrl.findAllPublicationsForOne);
router.get('/:id', publicationCtrl.findOnePublication);
router.post('/', multer, publicationCtrl.createPublication);
router.put('/:id', multer, publicationCtrl.modifyPublication);
router.delete('/:id', publicationCtrl.deletePublication);

module.exports = router;