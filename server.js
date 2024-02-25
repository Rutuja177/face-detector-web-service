const express = require('express');
const bodyParser = require('body-parser');
const faceDetectionRoutes = require('./routes/faceDetectionRoutes');
const { initialize } = require('express-openapi');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware; increase the request size limit for base64 images (default is 100kb)
app.use(bodyParser.json({ limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.use('/api/face-detection', faceDetectionRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//OpenAPI routes
initialize({
    apiDoc: require("./api-doc"),
    paths:'./api/paths',
})