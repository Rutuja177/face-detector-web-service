const detectFaces = require('../utils/modelTest.js')
const FaceDetectionRequest = require('../model/FaceDetectionRequest.js');
const faceDetectionDataHandler = require('../utils/database.js')


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
    try{
        const base64Image = req.body.image.split(';base64,').pop();

        const progressCallback = (progress) =>{
            console.log('Progress', progress)
        }
        const faceCount = await detectFaces(base64Image, progressCallback);

        //a new FaceDetectionRequest object
        const newReq = new FaceDetectionRequest("image", faceCount)

        //insert the new request into the database
        const newData = await faceDetectionDataHandler.insertFaceDetectionRequest(newReq)
        
        res.status(201).json({ message: 'Face detection request created successfully.'})
    } catch (error){
        console.error(error);
        res.status(500).json({message:"Internal server error"})
    }
}

exports.getFaceDetectionRequest = async (req, res) =>{

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
