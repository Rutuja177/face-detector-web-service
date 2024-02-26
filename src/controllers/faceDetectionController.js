const detectFaces = require('../utils/modelTest.js')
const FaceDetectionRequest = require('../model/FaceDetectionRequest.js');
const faceDetectionDataHandler = require('../utils/database.js')
const fs = require('fs');
const multer = require('multer');

// Initializing multer middleware
const upload = multer().single('image');

exports.getAllFaceDetectionRequest = async (req, res) =>{
    try{
        const face_detections = await faceDetectionDataHandler.getAllFaceDetectionRequest();
        if (face_detections.length > 0){
            res.status(201).json({ face_detections })
        } else {
            res.status(404).json({message: "No face detection record found"})
        }
    } catch (error){
        res.status(500).json({message: "Internal server error"})
    }
}

exports.createFaceDetectionRequest = async (req, res) => {
    try {
        upload(req, res, async function (error) {
          if (error instanceof multer.MulterError) {
            // if a multer error occurred
            console.error(error);
            return res.status(401).json({ message: 'Error uploading file' });
          } else if (error) {
            // Other errors occurred
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
          }
          // File uploaded successfully
          if (!req.file) {
            return res.status(401).json({ message: 'No file uploaded' });
          }
          const imageBuffer = req.file.buffer
    
          const progressCallback = (progress) => {
            console.log('progress', progress);
          };
    
          const faceCount = await detectFaces(imageBuffer, progressCallback);
          
          // Insert the new request into the database
          const newReq = new FaceDetectionRequest(req.file.originalname, faceCount);
          const newData = await faceDetectionDataHandler.insertFaceDetectionRequest(newReq);
    
          res.status(201).json({ message: 'Face detection request created successfully.' , "faceCounts": faceCount});
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      } 
    } 
exports.deleteFaceDetectionRequest = async (req, res) =>{
    try{
        const id = req.params.id

        //delete the requested record Id
        const newData = await faceDetectionDataHandler.deleteFaceDetectionRequest(id)
        
        res.status(201).json({ message: `${id} deleted`, newData})

    } catch (error){
        console.error("the error", error);
        res.status(500).json({message:"Internal server error"})
    }

}
