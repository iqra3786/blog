const express = require('express');
const router = express.Router();
const {updateRoleByAdmin,getUserDetails} = require('../controllers/adminController')
const {authentication, authorization} = require('../middleware/auth');


router.put('/updateRole/:id',authentication, authorization, updateRoleByAdmin);

router.get('/getUserDetails/:id',authentication, authorization,getUserDetails)


module.exports = router;