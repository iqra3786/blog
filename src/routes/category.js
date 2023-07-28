const express = require('express');
const router = express.Router();
const {createCategory, updateCategoryById, getAllCategories,getCatById,deletecategoryById} = require('../controllers/categoryController');
const {authentication, authorization} = require('../middleware/auth');
const {asyncWrapper}=require('../helper/helper')


router.post('/create',authentication,authorization,asyncWrapper(createCategory));

router.put('/update/:id',authentication,authorization,asyncWrapper(updateCategoryById));

router.get('/getAll', asyncWrapper(getAllCategories));

router.get('/getCatById/:id', asyncWrapper(getCatById));

router.delete('/delete/:id',authentication,authorization, asyncWrapper(deletecategoryById))


module.exports = router;