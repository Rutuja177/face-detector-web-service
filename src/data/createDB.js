const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_loc = path.join(__dirname, '../data/database.db')
let db = new sqlite3.Database(DB_loc)

function createFaceDetectionRequestTable(){
    //SQL query to create the table
    const sql = `
        CREATE TABLE IF NOT EXISTS face_detection_requests (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT NOT NULL,
            result INTEGER NOT NULL
        )
    `;
    //execute the SQL query
    db.run(sql, function(err){
        if (err) {
            console.error('Error creating table:', err.message);
        } else {
            console.log('Table created successfully');
        }
    });
}
createFaceDetectionRequestTable();