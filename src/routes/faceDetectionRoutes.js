const express = require('express');
const router = express.Router();
const faceDetectionController = require('../controllers/faceDetectionController');

//routes
router.get('/', (req, res)=>{
    res.send(`<h1>health-check API</h1>`)
}) //health-check api

router.post('/detection', faceDetectionController.createFaceDetectionRequest);
router.get('/detection',faceDetectionController.getAllFaceDetectionRequest );
router.delete('/detection/:id', faceDetectionController.deleteFaceDetectionRequest)

module.exports = router