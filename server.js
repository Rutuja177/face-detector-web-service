const express = require('express');
const bodyParser = require('body-parser');
const faceDetectionRoutes = require('./routes/faceDetectionRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json({ limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.use('/api/face-detection', faceDetectionRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});