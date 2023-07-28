const express = require('express');
const router = express.Router();
const {updateRoleByAdmin,getUserDetails} = require('../controllers/adminController')
const {authentication, authorization} = require('../middleware/auth');
const{asyncWrapper}=require('../helper/helper')


router.put('/updateRole/:id',authentication, authorization, asyncWrapper(updateRoleByAdmin));

router.get('/getUserDetails/:id',authentication, authorization,asyncWrapper(getUserDetails))


module.exports = router;