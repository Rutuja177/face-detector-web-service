const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_loc = path.join(__dirname, '../data/database.db')
let db = new sqlite3.Database(DB_loc)

// function createFaceDetectionRequestTable(){
//     //SQL query to create the table
//     const sql = `
//         CREATE TABLE IF NOT EXISTS face_detection_requests (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT NOT NULL,
//             result INTEGER
//         )
//     `;
//     //execute the SQL query
//     db.run(sql, function(err){
//         if (err) {
//             console.error('Error creating table:', err.message);
//         } else {
//             console.log('Table created successfully');
//         }
//     });
// }
// createFaceDetectionRequestTable();

exports.insertFaceDetectionRequest = async (request) => {
    const sql = `INSERT INTO face_detection_requests (image, result) VALUES (?,?)`;
    const params = [request.image, request.result]
    try{
        const result = await new Promise((resolve, reject)=>{
            db.run(sql, params, function(err){
                if (err){
                    reject(err)
                } else{
                    resolve(this.lastID)
                    console.log(this.lastID, [request.image, request.result])
                }
            });
        })
        return result;
    } catch (error){
        throw error
    }
}
exports.getAllFaceDetectionRequest = async () =>{
    const sql = `SELECT * from face_detection_requests`;
    try{
        const result = await new Promise((resolve, reject)=>{
            db.all(sql, function(err, rows){
                if (err){
                    reject(err)
                } else{
                    resolve(rows)   
                }
            })
        })
        return result;
    } catch(error){
        throw error;
    }
}
exports.deleteFaceDetectionRequest = async (id) =>{
    const sql = `DELETE FROM face_detection_requests WHERE id = ?`;
    try{
        const result = await new Promise((resolve, reject)=>{
            db.run(sql, id, function(err, rows){
                if (err){
                    reject(err)
                } else{
                    resolve({Row: this.changes})   
                }
            })
        })
        return result;
    } catch(error){
        throw error;
       
    }

}