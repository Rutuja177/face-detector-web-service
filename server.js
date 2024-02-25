const express = require('express');
const bodyParser = require('body-parser');
const faceDetectionRoutes = require('./routes/faceDetectionRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/face-detection', faceDetectionRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});