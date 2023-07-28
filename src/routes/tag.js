const express = require('express');
const router = express.Router();
const {createTag, updateTagById, getAllTags,getTagById,deleteTagById} = require('../controllers/tagController');
const {authentication, authorization} = require('../middleware/auth');
const {asyncWrapper}=require('../helper/helper')
router.post('/create', authentication, authorization,asyncWrapper(createTag));

router.put('/update/:id', authentication,authorization,asyncWrapper(updateTagById));

router.get('/getAll', asyncWrapper(getAllTags));

router.get('/getTagById/:id', asyncWrapper(getTagById));

router.delete('/delete/:id',authentication, authorization, asyncWrapper(deleteTagById));

module.exports = router;