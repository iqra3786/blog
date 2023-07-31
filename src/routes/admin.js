const express = require('express');
const router = express.Router();
const {updateRoleByAdmin,getUserDetails, updatePermissionByAdmin} = require('../controllers/adminController')
const {authentication, authorization} = require('../middleware/auth');
const{asyncWrapper}=require('../helper/helper')


router.put('/updateRole/:id',authentication, authorization, asyncWrapper(updateRoleByAdmin));

router.get('/getUserDetails/:id',authentication, authorization,asyncWrapper(getUserDetails))

router.put('/updatePermission/:id',authentication,authorization,asyncWrapper(updatePermissionByAdmin))


module.exports = router;