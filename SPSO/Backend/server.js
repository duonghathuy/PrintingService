const express = require('express');
const mysql = require('mysql')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'12345',
    database:'ssps-db'
})
app.get('/', (re, res)=>{
    return res.json("From backend"); 
})
app.get('/user', (req, res) =>{
    // const sql = "CALL sum_pages('2023-01-01', '2023-11-29')";
    const sql = "SELECT * FROM user"
    db.query(sql, (err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/facultyList', (req, res) => {
    const query = 'CALL getFacultyList()';  
  
    db.query(query, [], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err.message);
      }
      res.json(result[0]);  
    });
  });

  app.get('/levelList', (req, res) => {
    const query = 'CALL getLevelList()';  
  
    db.query(query, [], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err.message);
      }
      res.json(result[0]);  
    });
  });

  app.post('/rangestudent', (req, res) => {
    const { start_date, end_date, faculty, level} = req.body;
    const query = 'CALL sum_pages(?, ?, ?, ?)';  
  
    db.query(query, [start_date, end_date, faculty, level], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err.message);
      }
      res.json(result[0]);  
    });
  });
  
  app.post('/rangefaculty', (req, res) => {
    const { start_date, end_date } = req.body;
    const query = 'CALL faculty_statistic(?, ?)';  
  
    db.query(query, [start_date, end_date], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err.message);
      }
      res.json(result[0]);  
    });
  });
  
  
  app.put('/updateuser/:id', (req, res) => {
    const {id, newLevel} = req.body
    console.log(id)
    const query = 'CALL update_level(?, ?)';

    db.query(query, [id, newLevel], (err, result) => {
      if (err) {
        console.error(err)
        return res.status(500).send(err.message);
      }
      res.json(result[0])
    })

  });

app.delete('/deleteuser/:id', (req, res) => {
    db.query("DELETE FROM service_user WHERE ID = '" + req.params.id+"' ", (err, rresult) =>{
        if(!err){
            res.status(200).json({success: "User record deleted successfully"})
        }
        else{
            console.log(err);
        }
    });
});
app.listen(5050, ()=>{
    console.log("listening")
})