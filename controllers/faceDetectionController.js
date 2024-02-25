const detectFaces = require('../utils/modelTest.js')

exports.createFaceDetectionRequest = async (req, res) => {
    try{
        const base64Image = req.body.image.split(';base64,').pop();

        const faceCount = await detectFaces(base64Image);

        res.send({faceCount})
    } catch (error){
        console.error("the error", error);
        res.status(500).json({message:error})
    }
}
exports.getFaceDetectionRequest = async (req, res) =>{

}
exports.getAllFaceDetectionRequest = async (req, res) =>{

}
exports.deleteFaceDetectionRequest = async (req, res) =>{

}
