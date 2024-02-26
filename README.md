# face-detector-web-service
A Web service using embedded face detection library to count faces in an image

## instructions:
1. clone the repo with `git clone https://github.com/Rutuja177/face-detector-web-service.git` <br>
2. docker compose up<br>
3. After running `docker-compose up`, the web service should be accessible at http://localhost:3000 in your web browser. You can use this URL to interact with the face detection APIs using API platform such as Postman.

## future scope:
1. Improve the status of the request. Currently, request status for the request logged in the console.
2. Address the occasional canvas error encountered when loading images with high pixel counts or width. 


## References:
https://github.com/justadudewhohacks/face-api.js <br>
https://medium.com/@neerajvageele451/build-your-own-face-recognition-web-app-using-face-api-js-7982cd4a8bdb