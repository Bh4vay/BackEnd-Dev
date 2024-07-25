const express = require('express');
const {localFileUpload,imageUpload, videoUpload, imageSizeReducerUpload} = require('../controllers/fileUpload');
const router = express.Router();

router.post("/localFileUpload", localFileUpload);
router.post("/imageUpload", imageUpload);
router.post("/videoUpload", videoUpload);
router.post("/imageSizeReducer", imageSizeReducerUpload);

module.exports = router;