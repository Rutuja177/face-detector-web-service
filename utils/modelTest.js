const express = require('express')
const cors = require('cors');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const faceapi = require('face-api.js');

const { Canvas, Image, ImageData } = require('canvas');
const canvas = require('canvas');

faceapi.env.monkeyPatch({ Canvas, Image, ImageData })

async function detectFaces(image){
    // Load face detection models
  await faceapi.nets.faceRecognitionNet.loadFromDisk(__dirname + "/models");
  await faceapi.nets.faceLandmark68Net.loadFromDisk(__dirname + "/models");
  await faceapi.nets.ssdMobilenetv1.loadFromDisk( __dirname + "/models");

  // console.log(Object.keys(faceapi.nets))

  const imageBuffer = Buffer.from(image, 'base64')

  const img = new Image();
  img.src = imageBuffer

  const detection = await faceapi.detectAllFaces(img);

  return detection.length;
}
module.exports = detectFaces;