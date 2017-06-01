var express = require('express');
var router = express.Router();

var ctrlCategory = require('../controllers/category.controller');

//  Category APIs
router.post('/category', ctrlCategory.categoryPost);
router.get('/categories', ctrlCategory.categoryGetAll);
router.put('/category/:categoryID', ctrlCategory.categoryPut);
router.delete('/category/:categoryID', ctrlCategory.categoryDel);

module.exports = router;
